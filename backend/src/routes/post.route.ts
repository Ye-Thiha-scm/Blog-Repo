import  express  from "express";
import { getPosts, createPost, findPost, updatePost, deletePost, findByName } from '../controllers/post.controller';
import { body } from 'express-validator';
import { create } from "domain";

const router = express.Router();

router
    .route("/")
    .get(getPosts)
    .post(
        [
            body("title").notEmpty().withMessage("Title must not be empty"),
            body("description").notEmpty().withMessage("Description must not be empty"),
            body("content").notEmpty().withMessage("Content must not be empty"),
            body("imgUrl").notEmpty().withMessage("imgUrl must not be empty"),
        ], createPost
    )

router
    .route("/search")
    .post(findByName)

router
    .route("/:id")
    .get(findPost)
    .put(
        [
            body("title").notEmpty().withMessage("Title must not be empty"),
            body("description").notEmpty().withMessage("Description must not be empty"),
            body("content").notEmpty().withMessage("Content must not be empty"),
            body("imgUrl").notEmpty().withMessage("imgUrl must not be empty"),
            body("status")
        ], updatePost
    )

    .delete(deletePost)
export default router;