import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import { deleteFile } from "../utils/utils";
import { UserCreate } from '../interfaces/user';
import User from '../models/user.model';

export const getUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // // const userType = req.headers['userType'];
    // const userId = req.headers['userId'];
    // let condition: any = { deleted_at: null };
    // if (userType === constData.userType) {
    //   condition.created_user_id = userId;
    // }
    const users: any = await User.find();
    const result: any = [];
    for (let i = 0; i < users.length; i++) {
      const index = users.findIndex((dist:any) => users[i]._id.equals(dist._id));
      let username = "";
      index !== -1 ? username = users[index].fullName : "";
      let obj: any = {
        ...users[i]._doc,
      };
      result.push(obj);
    }
    res.json({
      data: result,
      status: 1,
      total: result.length,
      links: {
        self: req.originalUrl,
      }
    });
  } catch (err) {
    next(err);
  }
};

export const createUserService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 401;
      throw error;
    }
    let profile: string = req.body.profile;
    if (req.files?.profile?.length > 0) {
      profile = req.files.profile[0].path.replaceAll("\\", "/");
    }
    const userTdo: UserCreate = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12),
      type: req.body.type,
      phone: req.body.phone,
      dob: req.body.dob,
      address: req.body.address,
      profile: profile,
      created_user_id: req.body.created_user_id,
    }
    const user = new User(userTdo);
    const result = await user.save();
    res
      .status(201)
      .json({ message: "Created User Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const findUserService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      const error: any = Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ data: user, status: 1 });
  } catch (err) {
    next(err);
  }
}

export const updateUserService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req.body);
    if (!errors.isEmpty()) {
      const error: any = new Error("Validation failed!");
      error.data = errors.array();
      error.statusCode = 422;

      throw error;
    }
    const user: any = await User.findByIdAndUpdate(req.params.id);
    if (!user) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    let profile: string = req.body.profile;
    if (req.files?.profile?.length > 0) {
      profile = req.files.profile[0].path.replace("\\", "/");
      if (user.profile && user.profile != profile) {
        deleteFile(user.profile);
      }
      if (profile) {
        user.profile = profile;
      }
    }
    user.fullName = req.body.fullName;
    user.email = req.body.email;
    user.type = req.body.type;
    user.phone = req.body.phone;
    user.dob = req.body.dob;
    user.address = req.body.address;
    user.created_user_id = req.body.created_user_id;
    user.updated_user_id = req.body.updated_user_id;
    const result = await user.save();
    res.json({ message: "Updated User Successfully!", data: result, status: 1 });
  } catch (err) {
    next(err);
  }
};

export const deleteUserService = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = await User.findByIdAndRemove(req.params.id);
    if (!user) {
      const error: any = new Error("Not Found!");
      error.statusCode = 401;
      throw error;
    }
    res.json({ message: "Delete User Successfully!", data: user, status: 1 });
  } catch (err) {
    next(err);
  }
}

export const passwordChangeService = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const user:any = await User.findById(req.params.id);

    const { oldPassword, newPassword, confirmPassword } = req.body;

    //Check required fields
    if (!oldPassword || !newPassword || !confirmPassword) {
      res.json({ message: "Please fill in all fields." });
    }
    
    //Check passwords match
    if (newPassword !== confirmPassword) {
      res.json({ message: "New password do not match." });
    } else {
      //Validation Passed
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      console.log(isMatch);
        if (isMatch) {
          //Update password for user with new password
          bcrypt.genSalt(12, (err, salt) =>
            bcrypt.hash(newPassword,salt, (err, hash) => {
              if (err) {
                throw err;
              }
              user.password = hash;
              user.save(); 
            })
          );
          res.json({ message: "Password Successfully Updated!", data: user, status: 1 });
        } else {
          res.json({ message: "Current Password is not match." })
        }
    }
  } catch (err) {
    res.json({ message: "Password does not match" });
  }
}