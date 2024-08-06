import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import Product from "../models/products.models.js";
import { ApiError } from "../utils/ApiError.js";

const addProduct = asyncHandler(async (req, res) => {
  const { title, description, price, category } = req.body;
  const imageFile = req.files.image[0];

  if (!title || !description || !price || !imageFile || !category) {
    throw new ApiError(400, "All fields are required.");
  }

  if ([title, description, category].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All the fields must be filled properly.");
  }

  const imageUpload = await uploadOnCloudinary(imageFile.path);

  if (!imageFile) {
    throw new ApiError(
      500,
      "Image uploading failed due to internal server error."
    );
  }

  const creatingProduct = {
    title,
    price,
    description,
    image: imageUpload.secure_url,
    category,
  };

  const createdProduct = await Product.create(creatingProduct);

  if (!createdProduct) {
    throw new ApiError(
      500,
      "Data uploading failed due to internal server error."
    );
  }
  await createdProduct.save();

  return res
    .status(201)
    .json(
      new ApiResponse(200, createdProduct, "Product uploaded successfully !")
    );
});

const listProduct = asyncHandler(async (_, res) => {
  const listProducts = await Product.find({});

  if (!listProducts) {
    throw new ApiError(
      500,
      "Product list fetch failed due to internal server error."
    );
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, listProducts, "Product list fetched successfully !")
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id || id.trim() === "") {
    throw new ApiError(400, "Product ID is missing.");
  }

  const productDeleted = await Product.findByIdAndDelete(id);

  if (!productDeleted) {
    throw new ApiError(
      500,
      "product not deleted due to internal server error."
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully !"));
});

export { addProduct, listProduct, deleteProduct };
