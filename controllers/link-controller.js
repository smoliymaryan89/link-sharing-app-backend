import Link from "../models/Link.js";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const { id: owner } = req.user;

  const result = await Link.find({ owner });

  res.json(result);
};

// const addLink = async (req, res) => {
//   const { id: owner } = req.user;
//   const result = await Link.create({ ...req.body, owner });
//   res.status(201).json(result);
// };

const addLink = async (req, res) => {
  const { id: owner } = req.user;

  const existingLink = await Link.findOne({ owner });

  if (!existingLink) {
    const result = await Link.create({ links: req.body.links, owner });
    res.status(201).json(result);
  } else {
    existingLink.links.push(...req.body.links);
    await existingLink.save();
    res.status(201).json(existingLink);
  }
};

const deleteById = async (req, res) => {
  const { id: owner } = req.user;
  const { linkId } = req.params;

  const userLinks = await Link.findOne({ owner });

  if (!userLinks) {
    throw HttpError(404, "No link found to delete");
  }

  const linkToDelete = userLinks.links.find((link) => link.id === linkId);

  if (!linkToDelete) {
    throw HttpError(404, "No link found to delete");
  }

  await Link.updateOne({ owner }, { $pull: { links: { id: linkId } } });

  if (userLinks.links.length === 1) {
    await Link.deleteOne({ owner });
  }

  res.json({ deletedLinkId: linkToDelete.id });
};

export default {
  addLink: ctrlWrapper(addLink),
  getAll: ctrlWrapper(getAll),
  deleteById: ctrlWrapper(deleteById),
};
