import Category from "../models/categories.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new ApiError(400, "All fields are required.");
  }

  if (name.trim() === "") {
    throw new ApiError(400, "All the fields must be filled properly.");
  }

  const creatingCategory = {
    name,
  };

  const createdCategory = await Category.create(creatingCategory);
  await createdCategory.save();

  if (!createdCategory) {
    throw new ApiError(
      500,
      "Category uploading failed due to internal server error."
    );
  }

  return res
    .status(201)
    .json(new ApiResponse(200, {}, "Category created successfully !"));
});

const listCategory = asyncHandler(async (_, res) => {
  const listCategory = await Category.find({});

  if (!listCategory) {
    throw new ApiError(
      500,
      "Category list fetching failed due to internal server error."
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, listCategory, "Category list fetched successfully !")
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id || id.trim() === "") {
    throw new ApiError(400, "ID is missing.");
  }

  const categoryDeleted = await Category.findByIdAndDelete(id);

  if (!categoryDeleted) {
    throw new ApiError(
      500,
      "Category not deleted due to internal server error."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Category deleted successfully !"));
});

export { addCategory, listCategory, deleteCategory };
