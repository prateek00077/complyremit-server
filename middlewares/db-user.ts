import type { RequestHandler } from "express";
import type { AuthRequest } from "./auth";
import userRepository from "../repositories/user.repository";
import AppError from "../lib/AppError";

const dbUser: RequestHandler = async (req, _res, next) => {
  try {
    const authReq = req as AuthRequest;
    const user = await userRepository.findByClerkUserId(authReq.user.clerkUserId);

    if (!user) {
      throw new AppError(404, "User not found. Please create an account first.");
    }

    authReq.dbUser = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default dbUser;
