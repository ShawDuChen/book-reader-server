import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";
import swaggerUi from "swagger-ui-express";
import { LoginController } from "./controllers/login.controller";

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {
    controllers: [LoginController],
  },
  {
    info: {
      title: "SwaggerUi API",
      version: "1.0.0",
    },
  },
);

export { swaggerUi, spec };
