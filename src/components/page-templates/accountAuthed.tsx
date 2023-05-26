// LIBIARIES
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FaImage } from "react-icons/fa";
import { User } from "next-auth";

// COMPONENTS
import NameChangeFormModal from "~/components/forms/nameChangeFormModal";

// TYPES
type Props = { user: User | null | undefined };

const AccountAuthed = ({ user }: Props) => {
  // RETURN
  return (
    <>
      <div className="grid grid-cols-4 items-center p-20 ">
        <h1 className="col-span-3 text-center text-5xl font-extrabold leading-normal text-gray-700 md:text-[4rem]">
          Hello {user?.name ? user.name : "friend"}!
        </h1>
        <div className="flex flex-col items-center justify-center gap-6">
          {user?.image && user?.name ? (
            <Image
              alt={user.name ? `${user.name}'s Profile Pic` : "Profile Pic"}
              src={user.image}
              width={150}
              height={150}
              className="col-span-2 rounded-md"
            />
          ) : (
            <FaImage className="text-5xl" />
          )}
          <button
            className="btn-xl btn-primary btn w-full font-bold"
            onClick={() => void signOut()}
          >
            Logout
          </button>
          <label
            htmlFor="account-name-change-modal"
            className="modal-button btn w-full font-bold"
          >
            Change Name
          </label>
        </div>
      </div>
      {user ? <NameChangeFormModal user={user} /> : null}
    </>
  );
};
export default AccountAuthed;
