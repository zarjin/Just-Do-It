import userModels from "../models/user.models.js";

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModels.findById(userId);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(200).json({ message: `getUser Error: ${error}` });
  }
};

export const getOtherUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModels.findById(userId);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(200).json({ message: `getOtherUser Error: ${error}` });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const user = await userModels.find();

    return res.status(200).json(user);
  } catch (error) {
    return res.status(200).json({ message: `getAllUser Error: ${error}` });
  }
};
