import express, { request, response } from "express";
import { Registration } from "../models/registration.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/registration", async (request, response) => {
  try {
    if (
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.email ||
      !request.body.mobile ||
      !request.body.password
    ) {
      return response.status(400).send({
        message: "send all required fields",
      });
    }
    const newUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      mobile: request.body.mobile,
      password: request.body.password,
    };
    const user = await Registration.create(newUser);
    return response.status(201).send({
      message: "Registration Successful, Please Login and Continue",
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});
router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).send({
      message: "send all required fields",
    });
  }
  const user = await Registration.findOne({ email });
  if (!user) {
    return response.status(404).json({
      message: "User not Found",
    });
  } else {
    if (user.password === password) {
      return response.status(200).send({
        message: "Login Successful",
        accessToken: uuidv4(),
      });
    }
  }
});
import transporter from "../mailer.js";

router.post("/forgot", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(401).json("Email ID required");
  }
  const user = await Registration.findOne({ email });
  const resetToken = uuidv4();
  user.resetToken = resetToken;
  // Email details
  const mailOptions = {
    from: "eeviib31@rgcer.edu.in",
    to: user.email,
    subject: "Test Email",
    text:
      process.env.NODE_ENV === "development"
        ? `This is your password Reset Link http://localhost:5173/auth/reset/${user.resetToken}`
        : `This is your password Reset Link https://mern-book-store-frontend.vercel.app/auth/reset/${user.resetToken}`,
  };
  if (!user) {
    res.status(402).json("User Not Found");
  }
  if (user) {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error.message);
      } else {
        console.log("Email sent:", info.response);
      }
    });
    await user.save();

    res.status(200).send({
      message: "Password reset link sent to Email, please check Email.",
    });
  }
});
router.get("/validateResetId/:resetToken", async (req, res) => {
  try {
    const { resetToken } = req.params;
    if (!resetToken) {
      return res.status(400).send("Invalid Reset Link");
    }

    const user = await Registration.findOne({ resetToken });

    if (user) {
      return res.status(200).json({ message: "Access Granted", id: user._id });
    } else {
      return res.status(401).send("Access Denied");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});

router.post("/reset", async (req, res) => {
  const resetToken = req.body.resetToken;
  if (!resetToken) {
    return res.status(401).json("Reset Token Missing");
  }

  const newPassword = req.body.newPassword;
  if (!newPassword) {
    return res.status(400).json("New Password Missing");
  }

  try {
    // Find the user by reset token
    const user = await Registration.findOne({ resetToken });

    // Check if the user exists
    if (!user) {
      return res.status(401).json("Invalid Reset Token");
    }

    // Update the user's password
    user.password = newPassword;

    // Clear the reset token
    user.resetToken = undefined;

    // Save the updated user
    await user.save();

    // Respond with a success message
    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

export default router;
