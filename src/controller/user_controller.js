const { userModel } = require("../models");

// Error handling middleware
const errorHandler = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal server error" });
};

exports.getUsers = async (req, res) => {
  try {
    const items = await userModel.findAll();
    res.status(200).json(items);
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await userModel.findByPk(itemId);
    if (!item) {
      res.status(404).json({ error: "Item not found" });
    } else {
      res.status(200).json(item);
    }
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.postUser = async (req, res) => {
  try {
    const { email, ...userData } = req.body;

    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const createdUser = await userModel.create({ email, ...userData });
    res.status(201).json(createdUser);
  } catch (error) {
    errorHandler(res, error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    const existingUser = await userModel.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await userModel.update(updatedUserData, { where: { id: userId } });

    const updatedUser = await userModel.findByPk(userId);
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const existingUser = await userModel.findByPk(userId);
    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    await existingUser.destroy();

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
