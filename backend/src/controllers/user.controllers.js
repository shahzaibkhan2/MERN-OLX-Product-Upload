import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/apiResponse.js";
import validator from "validator";

const registerUserLocal = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required.");
  }

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(400, "User with this email already exists.");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Please enter a valid email.");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password should be greater than 8 characters.");
  }

  const createdUser = await User.create({
    name,
    email,
    password,
  });

  if (!createdUser) {
    throw new ApiError(
      500,
      "User not created due to some internal server error."
    );
  }

  await createdUser.save();

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "User created successfully !"));
});

const loginUserLocal = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some((field) => field === "")) {
    throw new ApiError(400, "All the fields are required.");
  }

  const isUser = await User.findOne({ email });

  if (!isUser) {
    throw new ApiError(400, "User not found..");
  }

  const isPassCorrect = await isUser.isPasswordCorrect(password);

  if (!isPassCorrect) {
    throw new ApiError(400, "Invalid password");
  }

  const accessToken = isUser.generateAccessToken();

  if (!accessToken) {
    throw new ApiError(
      500,
      "Access token is not generated due to internal server error."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { accessToken }, "Logged in successfully !"));
});

export { registerUserLocal, loginUserLocal };
