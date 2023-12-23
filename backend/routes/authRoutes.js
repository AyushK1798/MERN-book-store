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

router.post("/forgot", async (req, res) => {
  const email = req.body.email;
  if (!email) {
    res.status(401).json("Email ID required");
  }
  const user = await Registration.findOne({ email });

  if (!user) {
    res.status(402).json("User Not Found")
  }
  if(user){
    const resetToken = uuidv4();
    res.status(200).send({
      message: "Password reset link sent to Email, please check Email.",
      resetToken
    });
  }
});

export default router;
