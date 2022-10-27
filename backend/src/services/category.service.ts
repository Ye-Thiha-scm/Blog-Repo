import { Request, Response, NextFunction } from 'express';
import category from '../models/category';
import { validationResult } from 'express-validator';
import { CategoryCreate } from '../interfaces/category';

/**get category service
 * @param _req
 * @param res
 * @param next
 */
export const getCategoryService = async(
    _req: any,
    res: Response,
    _next: NextFunction
) => {
    try {
        const categories = await category.find();
        res.json({ data: categories, status: 1});
    } catch (err) {
        res.send("Can't Fetch. An Error occured");
    }
};

/**
 * create category service
 * @param req 
 * @param res 
 * @param next 
 */
export const createCategoryService = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req.body);
        if (! errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = errors.array();
            error.statusCode = 422;
            throw error;
        }
        const categoryTdo: CategoryCreate = {
           id: req.body.id, 
           catName: req.body.catName, 
           catDesc: req.body.catDesc, 
           catImgUrl: req.body.catImgUrl, 
           catContent: req.body.catContent,
           created_user_id: req.body.created_user_id,
        }
        const Category: any = new category(categoryTdo);
        const result = await Category.save();

        res
            .status(201)
            .json({ Message: "Created Category Successfully", categories: result, status: 1});
    } catch (err) {
        next(err);
    }
}

export const updateCategoryService = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const errors = validationResult(req.body);
        if(! errors.isEmpty()) {
            const error: any = new Error("Validation failed!");
            error.data = error.array();
            error.statusCode = 401;
            throw error;
        }
       const Category: any = await category.findById(req.params.id);
       if(!category) {
        const error: any = new Error("Not Found!");
        error.statusCode = 401;
        throw error;
       }

       Category.id = req.body.id;
       Category.catName = req.body.catName;
       Category.catDesc = req.body.catDesc;
       Category.catContent = req.body.catContent;
       Category.catImgUrl = req.body.catImgUrl;
       Category.created_user_id = req.body.created_user_id;
       const result = await Category.save();
       res.json({ message: "Updated Successfully!", categories: result, status: 1 });
    } catch (err) {
        next(err)
    }
};

export const deleteCategoryService = async (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const Category: any = await category.findByIdAndRemove(req.params.id);
        if(!category) {
            const error: any = new Error ("Not Found!");
            error.statusCode = 401;
            throw error;
        }
        res.json({
            message: "Delete Category Successfully!",
            categories: category,
            status: 1,
        });
    } catch (err) {
        next(err);
    }
};

export const findByIdService = async (
    req: any,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const Categories = await category.findById(req.params.id);
      res.json({ categories: Categories, status: 1 });
    } catch (err) {
      next(err);
    }
  };
