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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategories = void 0;
const category_service_1 = require("../services/category.service");
const getCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_service_1.getCategoryService)(req, res, next);
});
exports.getCategories = getCategories;
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_service_1.createCategoryService)(req, res, next);
});
exports.createCategory = createCategory;
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_service_1.updateCategoryService)(req, res, next);
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_service_1.deleteCategoryService)(req, res, next);
});
exports.deleteCategory = deleteCategory;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, category_service_1.findByIdService)(req, res, next);
});
exports.findById = findById;
