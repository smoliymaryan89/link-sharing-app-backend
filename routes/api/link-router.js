import express from "express";

import linkController from "../../controllers/link-controller.js";

import { authenticate } from "../../middlewares/index.js";

import { validateBody } from "../../decorators/index.js";

const linkRouter = express.Router();

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAll);

linkRouter.post("/", linkController.addLink);

linkRouter.delete("/:linkId", linkController.deleteById);

export default linkRouter;
