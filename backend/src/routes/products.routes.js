import { Router } from "express";
import {
  addProduct,
  listProduct,
  deleteProduct,
} from "../controllers/products.controllers.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router
  .route("/add-product")
  .post(upload.fields([{ name: "image", maxCount: 1 }]), addProduct);
router.route("/list-product").get(listProduct);
router.route("/delete-product").post(deleteProduct);

export default router;
