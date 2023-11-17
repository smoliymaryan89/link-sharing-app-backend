import express from "express";

import profileController from "../../controllers/profile-controller.js";
import * as profileSchema from "../../models/Profile.js";

import {
  authenticate,
  isEmptyBody,
  isValidId,
  upload,
} from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const updateProfileValidate = validateBody(profileSchema.updateProfileSchema);

const profileRouter = express.Router();

profileRouter.patch(
  "/:userId",
  authenticate,
  isValidId,
  isEmptyBody,
  updateProfileValidate,
  profileController.addProfile
);

export default profileRouter;
