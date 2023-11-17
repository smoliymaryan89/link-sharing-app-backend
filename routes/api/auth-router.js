import express from "express";

import authController from "../../controllers/auth-controller.js";
import * as userSchemas from "../../models/User.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const authRouter = express.Router();

const userRegisterValidate = validateBody(userSchemas.userRegisterSchema);
const userLoginValidate = validateBody(userSchemas.userLoginSchema);
const updateUserProfileValidate = validateBody(userSchemas.updateUserSchema);

authRouter.post(
  "/register",
  isEmptyBody,
  userRegisterValidate,
  authController.register
);

authRouter.post("/login", isEmptyBody, userLoginValidate, authController.login);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.get("/current", authenticate, authController.current);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatarURL"),
  authController.updateUserAvatar
);

authRouter.patch(
  "/:userId",
  authenticate,
  isValidId,
  isEmptyBody,
  updateUserProfileValidate,
  authController.updateUserProfile
);

export default authRouter;
