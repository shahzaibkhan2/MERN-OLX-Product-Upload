import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  listCategory,
} from "../controllers/categories.controllers.js";

const router = Router();

router.route("/add-category").post(addCategory);
router.route("/list-category").get(listCategory);
router.route("/delete-category").post(deleteCategory);

export default router;
