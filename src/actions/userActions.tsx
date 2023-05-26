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

const UserRoles = ["USER", "ADMIN"];

// AUTH MIDDLEWARE
const userAuth = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role && UserRoles.includes(session?.user?.role)) {
    return session.user;
  }
  // if (!session) {
  throw new Error("Unauthorized - Must be a user to access");
  // return null;
  // }
};

// USER ROUTES
export const getMyUser = zact()(async () => {
  const user = await userAuth();
  if (user?.id) {
    return prisma.user.findUnique({
      where: { id: user.id },
    });
  }
});

export const changeName = zact(z.object(nameChangeSchema))(async (input) => {
  const user = await userAuth();
  if (user?.id) {
    return prisma.user.update({
      where: { id: user.id },
      data: {
        name: input.name,
      },
    });
  }
});

// TASK ROUTES
export const getOneTask = zact(
  z.object({
    taskId: z.string(),
  })
)(async (input) => {
  const user = await userAuth();
  if (user?.id) {
    return prisma.task.findFirst({
      where: { id: input.taskId },
    });
  }
});

export const getMyTasks = zact(z.object({ userId: z.string() }))(
  async (input) => {
    const user = await userAuth();
    if (user?.id) {
      return prisma.task.findMany({
        where: { ownerId: input.userId },
      });
    }
  }
);

export const createTask = zact(z.object(addTaskSchema))(async (input) => {
  const user = await userAuth();
  if (user?.id) {
    return prisma.task.create({
      data: {
        ownerId: user.id,
        title: input.title,
        timeframe: input.timeframe,
        timesToComplete: input.timesToComplete,
        comment: input.comment,
      },
    });
  }
});

export const updateTask = zact(z.object(addTaskSchema))(async (input) => {
  const user = await userAuth();
  if (user?.id) {
    return prisma.task.create({
      data: {
        ownerId: user.id,
        title: input.title,
        timeframe: input.timeframe,
        timesToComplete: input.timesToComplete,
        comment: input.comment,
      },
    });
  }
});

export const deleteTask = zact(z.object(addTaskSchema))(async (input) => {
  const user = await userAuth();
  if (user?.id) {
    return prisma.task.delete({
      where: { id: user.id },
    });
  }
});
