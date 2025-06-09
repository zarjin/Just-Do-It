import userModels from "../models/user.models.js";
import { hashPassword, comparePassword } from "../utils/bcrypt.utils.js";
import { generateToken } from "../utils/jwt.utils.js";

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await userModels.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists." });
    }

    const hashedPassword = await hashPassword(password);

    if (!hashedPassword) {
      return res.status(500).json({ message: "Password hashing failed." });
    }

    const newUser = await userModels.create({
      fullName,
      email,
      password: hashedPassword,
      profile: req.file?.path,
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profile: newUser.profile,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: `Register Error: ${error.message}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await userModels.findOne({ email });

    if (!existingUser) {
      return res.status(409).json({ message: "User is  not find." });
    }

    const ComparedPassword = await comparePassword(
      password,
      existingUser.password
    );

    if (!ComparedPassword) {
      return res.status(500).json({ message: "Password Conpared failed." });
    }

    const token = generateToken(existingUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profile: newUser.profile,
      },
      token,
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ message: `Register Error: ${error.message}` });
  }
};

export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Logout Error:", error);
    return res.status(500).json({ message: `Logout Error: ${error.message}` });
  }
};
