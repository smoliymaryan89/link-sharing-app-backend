import Joi from "joi";
import { Schema, model } from "mongoose";

import { handleSaveError, runValidatorAtUpdate } from "./hooks.js";

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const profileSchema = new Schema(
  {
    emailPreview: {
      type: String,
      match: emailRegexp,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

profileSchema.post("save", handleSaveError);

profileSchema.pre("findOneAndUpdate", runValidatorAtUpdate);

profileSchema.post("findOneAndUpdate", handleSaveError);

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp),
});

const Profile = model("profile", profileSchema);

export default Profile;
