import { clerkClient, verifyToken } from '@clerk/express';
import type { NextFunction, Request, Response } from 'express';
import AppError from '../lib/AppError';
import type { User } from '../generated/prisma/client';

interface ClerkUser {
  clerkUserId: string;
  email: string;
}

export interface AuthRequest extends Request {
  user: ClerkUser;
  dbUser?: User;
  customerId?: string;
}

export default async function auth(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const token = req.header('x-auth-token');
    if (!token) {
      return next(new AppError(401, 'Access denied. No token provided.'));
    }

    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY as string,
    });

    const user = await clerkClient.users.getUser(decoded.sub);

    const email = user.emailAddresses.find(
      (e) => e.id === user.primaryEmailAddressId,
    )?.emailAddress;

    if (!email) {
      return next(new AppError(401, 'No email associated with this account.'));
    }

    (req as AuthRequest).user = {
      clerkUserId: decoded.sub,
      email,
    };

    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(401, 'Invalid or expired token.'));
    }
  }
}
