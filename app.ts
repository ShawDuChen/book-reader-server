import { json, urlencoded } from "body-parser";
import { Action, createExpressServer } from "routing-controllers";
import ds from "./src/data-source";
import { UserController } from "./src/controllers/user.controller";
import { LoginController } from "./src/controllers/login.controller";
import { authenticateToken, getToken, verify } from "./src/middlewares/jwt";

ds.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((e) => {
    console.log("Error during Data Source initialization: ", e);
  });

const app = createExpressServer({
  controllers: [UserController, LoginController],
  classTransformer: true,
  currentUserChecker: async (action: Action) => {
    const token = getToken(action.request.headers.authorization);
    const user = await verify(token);
    return user;
  },
});

app.use(authenticateToken);

app.use(json());

app.use(urlencoded({ extended: true }));

app.listen(7001, () => {
  console.log("Server started on http://localhost:7001/");
});
