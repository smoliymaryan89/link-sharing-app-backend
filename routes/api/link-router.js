import express from "express";

import linkController from "../../controllers/link-controller.js";

import { authenticate } from "../../middlewares/index.js";

const linkRouter = express.Router();

linkRouter.use(authenticate);

linkRouter.get("/", linkController.getAll);

linkRouter.post("/", linkController.addLink);

linkRouter.patch("/reorder", linkController.reorderLink);

linkRouter.patch("/:linkId", linkController.updateLink);

linkRouter.delete("/:linkId", linkController.deleteById);

export default linkRouter;
