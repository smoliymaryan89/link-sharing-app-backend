import Joi from "joi";
import { Schema, model } from "mongoose";
import { handleSaveError, runValidatorAtUpdate } from "./hooks.js";

const linkSchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false }
);

linkSchema.post("save", handleSaveError);

linkSchema.pre("findOneAndUpdate", runValidatorAtUpdate);

linkSchema.post("findOneAndUpdate", handleSaveError);

export const linkAddSchema = Joi.object({
  value: Joi.string().required(),
  email: Joi.string().required(),
});

const Link = model("link", linkSchema);

export default Link;
