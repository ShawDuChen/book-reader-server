declare module "swagger-ui-express" {
  import { Handler } from "express";

  interface SwaggerUiOptions {
    explorer?: boolean;
    swaggerOptions?: any;
    customCss?: string;
    customCssUrl?: string;
    customJs?: string;
    customJsStr?: string;
    customSiteTitle?: string;
    customfavIcon?: string;
  }

  function setup(
    swaggerDoc: object,
    opts?: SwaggerUiOptions,
    options?: object,
    customCss?: string,
    customfavIcon?: string,
    swaggerUrl?: string,
  ): Handler;

  function serve(req: any, res: any, next: any): void;

  const serveFiles: Handler[];

  export { serve, setup, serveFiles };
}
