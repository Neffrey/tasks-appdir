"use client";

// LIBRARIES
import React, {
  type BaseSyntheticEvent,
  type FocusEvent,
  useRef,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useZact } from "zact/client";
import { type User } from "next-auth";

// COMPONENTS
import { changeName } from "~/actions/userActions";
import useOnClickOutside from "~/components/hooks/useOnClickOutside";

// FORM DEFAULTS
const defaultValues = {
  name: "",
};

// CONSTANTS
export const NAME_MIN_LENGTH = 3;
export const NAME_MAX_LENGTH = 30;

// SCHEMA
export const nameChangeSchema = {
  name: z
    .string()
    .min(NAME_MIN_LENGTH, {
      message: `Must be at least ${NAME_MIN_LENGTH} characters`,
    })
    .max(NAME_MAX_LENGTH, {
      message: `Must be ${NAME_MAX_LENGTH} characters or less`,
    }),
};

// TYPES
type Props = { user: User | null };
type SchemaKey = Extract<keyof typeof nameChangeSchema, string>;

/*************************
 *** COMPONENT
 ************************* */
const NameChangeForm = ({ user }: Props) => {
  // STATE
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleIsModalOpen = () => setIsModalOpen(!isModalOpen);

  // Session
  const { data: session } = useSession();
  // Server Actions
  const { mutate } = useZact(changeName);

  // RHF
  const prefillValues = {
    name: user?.name ? user.name : defaultValues.name,
  };
  const {
    register,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: prefillValues });

  // HANDLE CLICK OUTSIDE OF MODAL TO CLOSE
  const modalRef = useRef<HTMLInputElement>(null);
  const handleClickOutside = () => {
    if (isModalOpen) toggleIsModalOpen();
  };
  useOnClickOutside(modalRef, () => handleClickOutside());

  // Handle Field Validation
  const validateField = (field: SchemaKey, value: string) => {
    clearErrors(field);
    const result = nameChangeSchema[field].safeParse(value);
    if (!result.success) {
      setError(field, { message: result.error.formErrors.formErrors[0] });
    }
  };

  // HANDLER SUBMIT
  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    // console.log("onSubmit event: ", e);
    validateField("name", getValues("name"));
    if (!errors.name && session?.user?.id) {
      mutate({ name: getValues("name") });
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id="account-name-change-modal"
        className="modal-toggle"
        checked={isModalOpen}
        onChange={() => toggleIsModalOpen()}
      />
      <div className="modal w-full flex-col items-center justify-center">
        <div className="modal-box relative p-7" ref={modalRef}>
          <label
            htmlFor="account-name-change-modal"
            className="btn-sm btn-circle btn absolute right-2 top-2 hover:bg-error"
          >
            ✕
          </label>

          <div className="p-2" />
          <form
            className="grid grid-cols-3 gap-3"
            onSubmit={(e) => onSubmit(e)}
          >
            <h3 className="col-span-3 text-xl font-bold">Enter New Name</h3>

            {
              // ERROR MESSAGE
              errors?.name?.message ? (
                <label className="col-span-3 text-error">
                  {errors.name.message}
                </label>
              ) : null
            }
            <div className="col-span-2 flex flex-col">
              <input
                className={
                  "text-md h-full w-full rounded-md bg-neutral-content p-2 text-neutral" +
                  (errors?.name?.message
                    ? " border-2 border-y-4 border-solid border-error"
                    : "")
                }
                {...register("name", {
                  onBlur: (event: FocusEvent<HTMLInputElement>) => {
                    validateField(
                      event.target.name as SchemaKey,
                      event.target.value
                    );
                  },
                  minLength: NAME_MIN_LENGTH,
                  maxLength: NAME_MAX_LENGTH,
                })}
              />
            </div>
            <div className="col-span-1">
              <input
                type="submit"
                className="btn-xl btn-primary btn h-full w-full rounded-md"
                value="Change Name"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NameChangeForm;
