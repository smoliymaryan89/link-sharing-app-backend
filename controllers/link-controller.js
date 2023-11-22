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

  const existingLink = await Link.findOne({ owner });

  if (existingLink) {
    const updatedLink = await Link.findOneAndUpdate({ ...req.body });

    res.status(200).json(updatedLink);
  } else {
    const result = await Link.create({ ...req.body, owner });
    res.status(201).json(result);
  }
};

const deleteById = async (req, res) => {
  const { id: owner } = req.user;
  const { linkId } = req.params;

  const result = await Link.findOneAndUpdate(
    { owner },
    { $pull: { platform: { id: linkId } } }
  );

  if (!result) {
    throw HttpError(404);
  }

  const link = await Link.findOne({ owner });

  if (link.platform.length === 0) {
    await Link.findOneAndDelete({ owner });
    res.json({ message: "link and associated record deleted" });
  } else {
    res.json({ message: "link deleted" });
  }
};

export default {
  addLink: ctrlWrapper(addLink),
  getAll: ctrlWrapper(getAll),
  deleteById: ctrlWrapper(deleteById),
};
