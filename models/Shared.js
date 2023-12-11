import { Schema, model } from "mongoose";

import { handleSaveError, runValidatorAtUpdate } from "./hooks.js";

const sharedSchema = new Schema(
  {
    emailPreview: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    avatarURL: {
      type: String,
    },
    links: {
      type: Array,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

sharedSchema.pre("findOneAndUpdate", runValidatorAtUpdate);

sharedSchema.post("findOneAndUpdate", handleSaveError);

const Shared = model("shared", sharedSchema);

export default Shared;
