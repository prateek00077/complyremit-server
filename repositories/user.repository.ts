import { prisma } from "../lib/prisma";
import type { CreateUserData, UpdateUserData } from "../types/user.types";

const userRepository = {
  createUser: async (data: CreateUserData) => {
    return prisma.user.create({ data });
  },

  findByClerkUserId: async (clerkUserId: string) => {
    return prisma.user.findUnique({ where: { clerkUserId } });
  },

  findById: async (id: string) => {
    return prisma.user.findUnique({ where: { id } });
  },

  updateUser: async (clerkUserId: string, data: UpdateUserData) => {
    return prisma.user.update({ where: { clerkUserId }, data });
  },

  deleteUser: async (clerkUserId: string) => {
    return prisma.user.delete({ where: { clerkUserId } });
  },
};

export default userRepository;
