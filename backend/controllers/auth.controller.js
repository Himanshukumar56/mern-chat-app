import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateTokens.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate profile picture URL based on gender
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

    // Create new user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic,
    });

    // Save the user to the database
    if (newUser) {
      // Generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      // Respond with the created user data
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username, // Corrected field name
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user Entry" });
    }
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid Login credentials" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username, // Corrected field name
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.error("Error in signin controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "LoggedOut Succesfully" });
  } catch (error) {
    console.error("Error in signin controller:", error.message);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
