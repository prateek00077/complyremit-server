import AppError from "../lib/AppError";
import userRepository from "../repositories/user.repository";

export async function getVerifiedUser(clerkUserId: string) {
  const user = await userRepository.findByClerkUserId(clerkUserId);
  if (!user) {
    throw new AppError(404, "User not found.");
  }
  return user;
}
