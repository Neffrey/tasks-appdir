"use client";

// LIBRARIES
import { type Task } from "@prisma/client";
import { useZact } from "zact/client";
import { useSession } from "next-auth/react";

// ACTIONS
import {
  getMyTasks,
  deleteTask,
  updateTask,
} from "~/actions/userActions";

// COMPONENTS
import FilterGrid from "~/components/ui/filterGrid";
import AddTaskForm from "~/components/forms/addTaskForm";
import { addTaskSchema } from "~/components/forms/addTaskForm";
import { PartialTypeExcept } from "~/components/helpers/partialTypeExcept";

// COLUMNS
const columns = [
  {
    dataKey: "title",
    title: "Title",
  },
  {
    dataKey: "timesToComplete",
    title: "# of completions",
  },
  {
    dataKey: "timeframe",
    title: "Per Timeframe",
  },
  {
    dataKey: "comment",
    title: "Comment",
  },
];

const TasksAuthed = () => {
  // SESSION
  const { data: session } = useSession();

  // SERVER ACTIONS
  const {
    mutate: getMyTasksMutate,
    data: getMyTasksData,
    isLoading: getMyTasksIsLoading,
  } = useZact(getMyTasks);

  const {
    mutate: updateTaskMutate,
    data: updateTaskData,
    isLoading: updateTaskIsLoading,
  } = useZact(updateTask);

  const {
    mutate: deleteTaskMutate,
    data: deleteTaskData,
    isLoading: deleteTaskIsLoading,
  } = useZact(deleteTask);

  // TABLE ACTIONS
  const refreshData = () => {
    if (session?.user?.id) getMyTasksMutate({ userId: session.user.id });
  };
  const updateData = () => {
    if (session?.user?.id) getMyTasksMutate({ userId: session.user.id });
  };
  const deleteData = () => {
    if (session?.user?.id) getMyTasksMutate({ userId: session.user.id });
  };

  // const updateTasks = (task: PartialTypeExcept<Task, "id">) => {
  //   console.log(task);
  //   const fullTask = oneTask ? { ...oneTask, ...task } : task;
  //   // updateTaskMutation(task);
  // };

  // const deleteTasks = () => {
  //   const { mutate } = api.user.deleteTask.useMutation({
  //     onSuccess: () => {
  //       void ctx.user.getMyTasks.invalidate();
  //     },
  //     onError: (error) => {
  //       console.log("Update Task Error: ", error);
  //     },
  //   });
  // };

  // RETURN
  return (
    <div className="grid grid-cols-4 items-center p-20 ">
      <h1 className="text-xl">Tasks for User</h1>
      <div className="p-4" />
      <AddTaskForm />
      <FilterGrid<Task>
        dataTitlePlural="Tasks"
        columns={columns}
        data={getMyTasksData ? getMyTasksData : []}
        refreshData={refreshData}
        updateData={updateData}
        deleteData={deleteData}
      />
    </div>
  );
};
export default TasksAuthed;
