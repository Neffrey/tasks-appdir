"use server";

// LIBRARIES
import { z } from "zod";
import { zact } from "zact/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

// UTILS
import { prisma } from "~/server/db";

// SCEMAS
import { addTaskSchema } from "~/components/forms/addTaskForm";
import { nameChangeSchema } from "~/components/forms/nameChangeFormModal";
import { Role } from "@prisma/client";

// ROLES
const AdminRoles = "ADMIN";

// AUTH MIDDLEWARE
const adminAuth = async () => {
  const session = await getServerSession(authOptions);
  if (session && session?.user?.role && AdminRoles === session?.user?.role) {
    return session;
  }
  throw new Error("Unauthorized - Must be a user to access");
};

// USER ROUTES
export const getAllUsers = zact()(async (input) => {
  const authed = await adminAuth();
  if (authed) {
    return prisma.user.findMany();
  }
});

export const updateUser = zact(
  z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.string().optional(),
    image: z.string().optional(),
    role: z.enum(["ADMIN", "USER", "RESTRICTED"]).optional(),
  })
)(async (input) => {
  const authed = await adminAuth();
  if (authed) {
    return prisma.user.update({
      where: { id: input.id },
      data: {
        name: input.name,
        email: input.email,
        image: input.image,
        role: input.role,
      },
    });
  }
});

export const deleteUser = zact(
  z.object({
    id: z.string(),
  })
)(async (input) => {
  const authed = await adminAuth();
  if (authed) {
    return prisma.user.delete({
      where: { id: input.id },
    });
  }
});

