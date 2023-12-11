import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Link from "../models/Link.js";
import Shared from "../models/Shared.js";

import { ctrlWrapper } from "../decorators/index.js";

const getSharedData = async (req, res) => {
  const { id: owner } = req.params;

  const user = await User.findOne({ _id: owner });
  const profile = await Profile.findOne({ owner });
  const link = await Link.findOne({ owner });

  const avatarURL = user && user.avatarURL;
  const { firstName, lastName, emailPreview } = profile || {};
  const links = link && link.links;

  const sharedData = await Shared.findOneAndUpdate(
    { owner },
    { avatarURL, firstName, lastName, links, owner, emailPreview },
    { upsert: true }
  );

  res.json(sharedData);
};

export default {
  getSharedData: ctrlWrapper(getSharedData),
};
