import { json, urlencoded } from "body-parser";
import { Action, createExpressServer } from "routing-controllers";
import {
  UserController,
  LoginController,
  BookController,
  ChapterController,
  RoleController,
  DictionaryController,
} from "./src/export";
import { authenticateToken, getToken, verify } from "./src/middlewares/jwt";
import ds from "./src/data-source";
import { logMiddleware } from "./src/middlewares/log";
import { CategoryController } from "./src/controllers/category.controller";
import { LoggerController } from "./src/controllers/log.controller";

ds.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((e) => {
    console.log("Error during Data Source initialization: ", e);
  });

const app = createExpressServer({
  controllers: [
    UserController,
    LoginController,
    BookController,
    ChapterController,
    RoleController,
    CategoryController,
    LoggerController,
    DictionaryController,
  ],
  classTransformer: true,
  currentUserChecker: async (action: Action) => {
    const token = getToken(action.request.headers.authorization);
    const user = await verify(token);
    return user;
  },
});

app.use(logMiddleware);

app.use(authenticateToken);

app.use(json());

app.use(urlencoded({ extended: true }));

app.listen(7001, () => {
  console.log("Server started on http://localhost:7001/");
});
