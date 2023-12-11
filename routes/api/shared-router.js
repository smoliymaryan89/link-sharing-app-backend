import express from "express";

import sharedController from "../../controllers/shared-controller.js";

const sharedRouter = express.Router();

sharedRouter.get("/:id", sharedController.getSharedData);

export default sharedRouter;
