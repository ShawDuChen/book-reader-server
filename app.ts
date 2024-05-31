import path from "node:path";
import { json, urlencoded } from "body-parser";
import { Action, createExpressServer } from "routing-controllers";
import { authenticateToken, getToken, verify } from "@/middlewares/jwt";
import { logMiddleware } from "@/middlewares/log";
import ds from "@/data-source";
import express from "express";

ds.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    const app = createExpressServer({
      controllers: [
        path.join(__dirname, "./src/controllers/**/*.controller.{js,ts}"),
      ],
      classTransformer: true,
      currentUserChecker: async (action: Action) => {
        const token = getToken(action.request.headers.authorization);
        const user = await verify(token);
        return user;
      },
    });

    app.use("/static", express.static(path.join(__dirname, "./uploads")));

    app.use(logMiddleware);

    app.use(authenticateToken);

    app.use(json());

    app.use(urlencoded({ extended: true }));

    app.listen(7001, () => {
      console.log("Server started on http://localhost:7001/");
    });
  })
  .catch((e) => {
    console.log("Error during Data Source initialization: ", e);
  });
