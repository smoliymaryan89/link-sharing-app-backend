import express from "express";

import * as linkSchema from "../../models/Link.js";
import linkController from "../../controllers/link-controller.js";

import { authenticate, isValidId } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const addLinkValidate = validateBody(linkSchema.linkAddSchema);

const linkRouter = express.Router();

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAll);

linkRouter.post("/", linkController.addLink);

linkRouter.delete("/:contactId", isValidId, linkController.deleteById);

export default linkRouter;
