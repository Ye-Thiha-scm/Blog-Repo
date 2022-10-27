"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const category_controller_1 = require("../controllers/category.controller");
const category_service_1 = require("../services/category.service");
const router = express_1.default.Router();
router
    .route("/")
    .get(category_controller_1.getCategories)
    .post([
    (0, express_validator_1.body)("id").notEmpty().withMessage("id must not be empty"),
    (0, express_validator_1.body)("catName").notEmpty().withMessage("catName must not be empty"),
    (0, express_validator_1.body)("catDesc").notEmpty().withMessage("catDesc must not be empty"),
    (0, express_validator_1.body)("catImgUrl").notEmpty().withMessage("catImgUrl must not be empty"),
    (0, express_validator_1.body)("catContent").notEmpty().withMessage("catContent must not be empty"),
], category_controller_1.createCategory);
router
    .route("/:id")
    .post(category_service_1.findByIdService);
router
    .route("/:id")
    .put([
    (0, express_validator_1.body)("id").notEmpty().withMessage("id must not be empty"),
    (0, express_validator_1.body)("catName").notEmpty().withMessage("catName must not be empty"),
    (0, express_validator_1.body)("catDesc").notEmpty().withMessage("catDesc must not be empty"),
    (0, express_validator_1.body)("catImgUrl").notEmpty().withMessage("catImgUrl must not be empty"),
    (0, express_validator_1.body)("catContent").notEmpty().withMessage("catContent must not be empty"),
], category_controller_1.updateCategory)
    .delete(category_controller_1.deleteCategory);
exports.default = router;
