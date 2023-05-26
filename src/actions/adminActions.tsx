"use server";

// LIBRARIES
import { z } from "zod";
import { zact } from "zact/server";
import { User } from "next-auth";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";

// UTILS
import { prisma } from "~/server/db";

// SCEMAS
import { addTaskSchema } from "~/components/forms/addTaskForm";
import { nameChangeSchema } from "~/components/forms/nameChangeFormModal";

// AUTH MIDDLEWARE
const adminAuth = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error("Unauthorized - Must be a user to access");
    return null;
  }
  return session.user;
};

// USER ROUTES

export const getAllUsers = zact()(async (input) => {
  const user = await adminAuth();
  if (user?.id) {
    return prisma.user.findMany();
  }
});

// updateUser: adminProcedure
//   .input(
//     z.object({
//       id: z.string(),
//       name: z.string(),
//       email: z.string(),
//       role: z.nativeEnum(Role),
//     })
//   )
//   .mutation(({ input, ctx }) => {
//     return ctx.prisma.user.update({
//       where: { id: input.id },
//       data: {
//         name: input.name,
//         email: input.email,
//         role: input.role,
//       },
//     });
//   }),
// deleteUser: adminProcedure
//   .input(z.object({ id: z.string() }))
//   .mutation(({ input, ctx }) => {
//     return ctx.prisma.user.delete({ where: { id: input.id } });
//   }),
// });
