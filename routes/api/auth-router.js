import express from "express";

import authController from "../../controllers/auth-controller.js";
import * as userSchemas from "../../models/User.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const authRouter = express.Router();

const userRegisterValidate = validateBody(userSchemas.userRegisterSchema);
const userLoginValidate = validateBody(userSchemas.userLoginSchema);

authRouter.post(
  "/register",
  isEmptyBody,
  userRegisterValidate,
  authController.register
);

authRouter.post("/login", isEmptyBody, userLoginValidate, authController.login);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.current);

export default authRouter;
