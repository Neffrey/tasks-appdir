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

// ROLES
const UserRoles = ["USER", "ADMIN"];

// AUTH MIDDLEWARE
const userAuth = async () => {
  const session = await getServerSession(authOptions);
  if (
    session &&
    session?.user?.role &&
    UserRoles.includes(session?.user?.role)
  ) {
    return session;
  }
  throw new Error("Unauthorized - Must be a user to access");
};

// USER ROUTES
export const getMyUser = zact()(async () => {
  const authed = await userAuth();
  if (authed) {
    return prisma.user.findUnique({
      where: { id: authed.user.id },
    });
  }
});

export const changeName = zact(z.object(nameChangeSchema))(async (input) => {
  const authed = await userAuth();
  if (authed) {
    return prisma.user.update({
      where: { id: authed.user.id },
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
  const authed = await userAuth();
  if (authed) {
    return prisma.task.findFirst({
      where: { id: input.taskId },
    });
  }
});

export const getMyTasks = zact(z.object({ userId: z.string() }))(
  async (input) => {
    const authed = await userAuth();
    if (authed) {
      return prisma.task.findMany({
        where: { ownerId: input.userId },
      });
    }
  }
);

export const createTask = zact(z.object(addTaskSchema))(async (input) => {
  const authed = await userAuth();
  if (authed) {
    return prisma.task.create({
      data: {
        ownerId: authed.user.id,
        title: input.title,
        timeframe: input.timeframe,
        timesToComplete: input.timesToComplete,
        comment: input.comment,
      },
    });
  }
});

export const updateTask = zact(z.object(addTaskSchema))(async (input) => {
  const authed = await userAuth();
  if (authed) {
    return prisma.task.create({
      data: {
        ownerId: authed.user.id,
        title: input.title,
        timeframe: input.timeframe,
        timesToComplete: input.timesToComplete,
        comment: input.comment,
      },
    });
  }
});

export const deleteTask = zact(z.object(addTaskSchema))(async (input) => {
  const authed = await userAuth();
  if (authed) {
    return prisma.task.delete({
      where: { id: authed.user.id },
    });
  }
});
