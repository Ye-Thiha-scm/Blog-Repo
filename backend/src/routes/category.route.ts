import express from 'express';
import { body } from 'express-validator';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../controllers/category.controller';
import { findByIdService } from '../services/category.service';

const router = express.Router();

router
    .route("/")
    .get(getCategories)
    .post(
        [
            body("id").notEmpty().withMessage("id must not be empty"),
            body("catName").notEmpty().withMessage("catName must not be empty"),
            body("catDesc").notEmpty().withMessage("catDesc must not be empty"),
            body("catImgUrl").notEmpty().withMessage("catImgUrl must not be empty"),
            body("catContent").notEmpty().withMessage("catContent must not be empty"),
        
        ], createCategory
    );

router
    .route("/:id")
    .post(findByIdService)

router
    .route("/:id")
    .put(
        [
            body("id").notEmpty().withMessage("id must not be empty"),
            body("catName").notEmpty().withMessage("catName must not be empty"),
            body("catDesc").notEmpty().withMessage("catDesc must not be empty"),
            body("catImgUrl").notEmpty().withMessage("catImgUrl must not be empty"),
            body("catContent").notEmpty().withMessage("catContent must not be empty"),
        ],
        updateCategory
    )
    .delete(deleteCategory)

export default router;