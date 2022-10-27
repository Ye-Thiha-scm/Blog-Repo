"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByIdService = exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getCategoryService = void 0;
const category_1 = __importDefault(require("../models/category"));
const express_validator_1 = require("express-validator");
/**get category service
 * @param _req
 * @param res
 * @param next
 */
const getCategoryService = (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield category_1.default.find();
        res.json({ data: categories, status: 1 });
    }
    catch (err) {
        res.send("Can't Fetch. An Error occured");
    }
});
exports.getCategoryService = getCategoryService;
/**
 * create category service
 * @param req
 * @param res
 * @param next
 */
const createCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const categoryTdo = {
            id: req.body.id,
            catName: req.body.catName,
            catDesc: req.body.catDesc,
            catImgUrl: req.body.catImgUrl,
            catContent: req.body.catContent,
            created_user_id: req.body.created_user_id,
        };
        const Category = new category_1.default(categoryTdo);
        const result = yield Category.save();
        res
            .status(201)
            .json({ Message: "Created Category Successfully", categories: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.createCategoryService = createCategoryService;
const updateCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req.body);
        if (!errors.isEmpty()) {
            const error = new Error("Validation failed!");
            error.data = error.array();
            error.statusCode = 401;
            throw error;
        }
        const Category = yield category_1.default.findById(req.params.id);
        if (!category_1.default) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        Category.id = req.body.id;
        Category.catName = req.body.catName;
        Category.catDesc = req.body.catDesc;
        Category.catContent = req.body.catContent;
        Category.catImgUrl = req.body.catImgUrl;
        Category.created_user_id = req.body.created_user_id;
        const result = yield Category.save();
        res.json({ message: "Updated Successfully!", categories: result, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Category = yield category_1.default.findByIdAndRemove(req.params.id);
        if (!category_1.default) {
            const error = new Error("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({
            message: "Delete Category Successfully!",
            categories: category_1.default,
            status: 1,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCategoryService = deleteCategoryService;
const findByIdService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Categories = yield category_1.default.findById(req.params.id);
        res.json({ categories: Categories, status: 1 });
    }
    catch (err) {
        next(err);
    }
});
exports.findByIdService = findByIdService;
