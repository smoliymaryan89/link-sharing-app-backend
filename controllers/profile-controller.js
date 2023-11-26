import Profile from "../models/Profile.js";

import { HttpError } from "../helpers/index.js";
import { ctrlWrapper } from "../decorators/index.js";

const addProfile = async (req, res) => {
  const { id: owner } = req.user;

  const existingProfile = await Profile.findOne({ owner });

  if (existingProfile) {
    const updatedProfile = await Profile.findOneAndUpdate(
      { owner },
      { ...req.body }
    );

    res.status(200).json(updatedProfile);
  } else {
    const newProfile = await Profile.create({ ...req.body, owner });
    res.status(201).json(newProfile);
  }
};

const getProfile = async (req, res) => {
  const { id: owner } = req.user;

  const result = await Profile.findOne({ owner });

  if (!result) {
    throw HttpError(404, "Profile not found");
  }

  res.json(result);
};

export default {
  addProfile: ctrlWrapper(addProfile),
  getProfile: ctrlWrapper(getProfile),
};
