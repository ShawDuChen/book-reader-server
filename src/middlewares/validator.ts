import { json } from "body-parser";
import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

export const createValidateMiddleware = (rules: ValidationChain[]) => {
  return [
    json(),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await Promise.all(rules.map((rule) => rule.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      } catch (error) {
        return res
          .status(500)
          .json({ error: "An error occurred during validation" });
      }
    },
  ];
};
