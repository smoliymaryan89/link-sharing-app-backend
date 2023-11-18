import Link from "../models/Link.js";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { id: owner } = req.user;

  const result = await Link.find({ owner });

  res.json(result);
};

const addLink = async (req, res) => {
  const { id: owner } = req.user;
  const result = await Link.create({ ...req.body, owner });
  res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { id: owner } = req.user;
  const { contactId } = req.params;

  const result = await Link.findOneAndDelete({ _id: contactId, owner });

  if (!result) {
    throw HttpError(404);
  }

  res.json({ message: "link deleted" });
};

export default {
  addLink: ctrlWrapper(addLink),
  getAll: ctrlWrapper(getAll),
  deleteById: ctrlWrapper(deleteById),
};
