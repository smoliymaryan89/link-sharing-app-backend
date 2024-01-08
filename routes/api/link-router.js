import express from "express";

import linkController from "../../controllers/link-controller.js";

import { authenticate } from "../../middlewares/index.js";

const linkRouter = express.Router();

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAll);

linkRouter.patch("/", linkController.addOrReorderLink);

linkRouter.patch("/:linkId", linkController.updateLink);

linkRouter.delete("/:linkId", linkController.deleteById);

export default linkRouter;
