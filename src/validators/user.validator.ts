import { check } from "express-validator";
import { createValidateMiddleware } from "@/middlewares/validator";

const userValidatorRules = [
  check("username").isEmail().withMessage("Username must be an email"),
  check("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be between 8 and 16 characters"),
];

export const userValidator = createValidateMiddleware(userValidatorRules);
