import { Request, Response, NextFunction } from 'express';
import {
    getCategoryService,
    createCategoryService,
    updateCategoryService,
    deleteCategoryService,
    findByIdService
} from '../services/category.service';

export const getCategories = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    getCategoryService(req, res, next);
};

export const createCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    createCategoryService(req, res, next);
};
export const updateCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    updateCategoryService(req, res, next);
};
export const deleteCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    deleteCategoryService(req, res, next);
};
export const findById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    findByIdService(req, res, next);
};