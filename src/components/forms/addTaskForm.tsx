"use client";

// LIBRARIES
import React, {
  type BaseSyntheticEvent,
  type FocusEvent,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { TaskTimeframe } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useZact } from "zact/client";

// SERVER ACTIONS
import { getMyTasks, createTask } from "~/actions/userActions";

// COMPONENTS
import Modal from "~/components/ui/modal";

// FORM DEFAULTS
const defaultValues = {
  title: "",
  comment: "",
  timesToComplete: "1",
  timeframe: TaskTimeframe.DAY,
};

// CONSTANTS
export const TITLE_LENGTH_MIN = 3;
export const TITLE_LENGTH_MAX = 30;
export const COMMENT_LENGTH_MAX = 256;

// Schema
export const addTaskSchema = {
  title: z
    .string()
    .min(TITLE_LENGTH_MIN, {
      message: `Must be at least ${TITLE_LENGTH_MIN} characters`,
    })
    .max(TITLE_LENGTH_MAX, {
      message: `Must be ${TITLE_LENGTH_MAX} characters or less`,
    }),
  comment: z
    .string()
    .max(COMMENT_LENGTH_MAX, {
      message: `Must be ${COMMENT_LENGTH_MAX} characters or less`,
    })
    .optional(),

  timeframe: z.nativeEnum(TaskTimeframe),
  timesToComplete: z
    .number({ invalid_type_error: "Must be a number" })
    .positive({ message: "Must be a positive number" })
    .optional(),
};

// TYPES
type RhfSchemaKeys = Extract<keyof typeof defaultValues, string>;

/*************************
 *** COMPONENT
 ************************* */
const AddTaskForm = () => {
  // STATE
  const [formError, setFormError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  // SERVER ACTIONS
  const { data: session } = useSession();
  const getMyTasksAction = useZact(getMyTasks);
  const createTaskAction = useZact(createTask);

  // // TRPC
  // const ctx = api.useContext();
  // const { mutate } = api.user.createTask.useMutation({
  //   onSuccess: () => {
  //     void ctx.user.getMyTasks.invalidate();
  //     reset(defaultValues);
  //   },
  //   onError: (error) => {
  //     setFormError(error.message);
  //   },
  // });

  // RHF
  const {
    register,
    getValues,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  // HANDLE FIELD VALIDATION
  const validateField = (field: RhfSchemaKeys, value: string) => {
    clearErrors(field);
    let result;
    if (field === "timesToComplete")
      result = addTaskSchema[field].safeParse(Number(value));
    else result = addTaskSchema[field].safeParse(value);
    if (!result.success) {
      setError(field, { message: result.error.formErrors.formErrors[0] });
    }
  };

  // HANDLE TIMEFRAME LABELS
  const timeframeLabel = (timeframe: TaskTimeframe) => {
    switch (timeframe) {
      case TaskTimeframe.DAY:
        return "Day";
      case TaskTimeframe.WEEK:
        return "Week";
      case TaskTimeframe.FORTNIGHT:
        return "Fortnight";
      case TaskTimeframe.MONTH:
        return "Month";
    }
  };

  // HANDLE SUBMIT
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    // Clear Form Errors
    setFormError("");

    // Validate FieldS
    Object.keys(defaultValues).forEach((field) => {
      validateField(field as RhfSchemaKeys, getValues(field as RhfSchemaKeys));
    });

    if (
      !errors.title &&
      !errors.comment &&
      !errors.timesToComplete &&
      !errors.timeframe
    ) {
      toggleIsModalOpen();
      if (session?.user?.id) {
        createTaskAction.mutate({
          title: getValues("title"),
          comment: getValues("comment"),
          timeframe: getValues("timeframe"),
          timesToComplete: Number.isSafeInteger(
            Number(getValues("timesToComplete"))
          )
            ? Number(getValues("timesToComplete"))
            : undefined,
        });
      }
    }
  };

  return (
    <>
      <button
        className="btn-primary btn px-8 py-4"
        onClick={() => toggleIsModalOpen()}
      >
        Add Task
      </button>
      <Modal
        id="account-name-change-modal"
        isModalOpen={isModalOpen}
        toggleIsModalOpen={toggleIsModalOpen}
      >
        <form className="flex flex-col gap-3" onSubmit={(e) => onSubmit(e)}>
          <button
            className="btn-primary btn px-8 py-4"
            onClick={(e) => {
              e.preventDefault();
              setFormError("SUUPER FAKE ERROR");
            }}
          >
            Fake Error
          </button>
          {/*** TASK TITLE ***/}
          <h3
            // TASK TITLE
            className="text-xl font-bold"
          >
            Enter Task Title
          </h3>
          {
            // TITLE ERROR MESSAGE
            errors?.title?.message ? (
              <label className="text-error">{errors.title.message}</label>
            ) : null
          }
          <input
            // TITLE INPUT
            className={
              "text-md h-full w-full rounded-md bg-neutral-content p-2 text-neutral" +
              (errors?.title?.message
                ? " border-2 border-y-4 border-solid border-error"
                : "")
            }
            {...register("title", {
              onBlur: (event: FocusEvent<HTMLInputElement>) => {
                validateField(
                  event.target.name as RhfSchemaKeys,
                  event.target.value
                );
              },
              minLength: TITLE_LENGTH_MIN,
              maxLength: TITLE_LENGTH_MAX,
            })}
          />

          {/*** TASK COMMENT ***/}
          <h3
            // TASK COMMENT
            className="text-xl font-bold"
          >
            Enter Task Comment
          </h3>
          {
            // COMMENT ERROR MESSAGE
            errors?.comment?.message ? (
              <label className="text-error">{errors.comment.message}</label>
            ) : null
          }
          <input
            // COMMENT INPUT
            className={
              "text-md h-full w-full rounded-md bg-neutral-content p-2 text-neutral" +
              (errors?.comment?.message
                ? " border-2 border-y-4 border-solid border-error"
                : "")
            }
            {...register("comment", {
              onBlur: (event: FocusEvent<HTMLInputElement>) => {
                validateField(
                  event.target.name as RhfSchemaKeys,
                  event.target.value
                );
              },
              maxLength: COMMENT_LENGTH_MAX,
            })}
          />

          {/*** TASK TIMESTOCOMPLETE ***/}
          <h3
            // TASK TIMESTOCOMPLETE
            className="text-xl font-bold"
          >
            # OF TIMES TO COMPLETE
          </h3>
          {
            // TIMESTOCOMPLETE ERROR MESSAGE
            errors?.timesToComplete?.message ? (
              <label className="text-error">
                {errors?.timesToComplete?.message}
              </label>
            ) : null
          }
          <input
            // TIMESTOCOMPLETE INPUT
            className={
              "text-md h-full w-full rounded-md bg-neutral-content p-2 text-neutral" +
              (errors?.timesToComplete?.message
                ? " border-2 border-y-4 border-solid border-error"
                : "")
            }
            {...register("timesToComplete", {
              onBlur: (event: FocusEvent<HTMLInputElement>) => {
                validateField(
                  event.target.name as RhfSchemaKeys,
                  event.target.value
                );
              },
            })}
          />

          {/*** TASK TIMEFRAME ***/}
          <h3
            // TASK TIMEFRAME
            className="text-xl font-bold"
          >
            PER TIMEFRAME
          </h3>
          {
            // TIMEFRAME ERROR MESSAGE
            errors?.timeframe?.message ? (
              <label className="text-error">{errors?.timeframe?.message}</label>
            ) : null
          }
          <div className="flex flex-row justify-between gap-2">
            {Object.values(TaskTimeframe).map((timeframe) => (
              <label
                key={timeframe}
                className="label flex cursor-pointer flex-row gap-2"
              >
                {timeframeLabel(timeframe)}
                <input
                  type="radio"
                  value={timeframe}
                  className="radio-secondary radio checked:radio-primary"
                  {...register("timeframe", {
                    onChange: (event: FocusEvent<HTMLInputElement>) => {
                      validateField(
                        event.target.name as RhfSchemaKeys,
                        event.target.value
                      );
                    },
                  })}
                />
              </label>
            ))}
          </div>

          <input
            // SUBMIT BUTTON
            type="submit"
            className="btn-xl btn-primary btn h-full w-full rounded-md"
            value="Add Task"
          />
          {
            // TITLE ERROR MESSAGE
            formError ? (
              <label className="text-md text-center font-semibold text-error">
                {formError}
              </label>
            ) : null
          }
        </form>
      </Modal>
    </>
  );
};

export default AddTaskForm;
