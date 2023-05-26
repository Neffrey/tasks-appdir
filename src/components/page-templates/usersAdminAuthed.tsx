"use client";

// LIBRARIES
import type { User } from "next-auth";

// SERVER ACTIONS
import { getAllUsers, deleteUser, updateUser } from "~/actions/adminActions";

// COMPONENTS
import FilterGrid from "~/components/ui/filterGrid";

// TABLE HEAD
const columns = [
  {
    dataKey: "createdAt",
    title: "Created",
  },
  {
    dataKey: "name",
    title: "Name",
  },
  {
    dataKey: "email",
    title: "Email",
  },
  {
    dataKey: "image",
    title: "Picture",
  },
  {
    dataKey: "role",
    title: "Role",
  },
];
// COMPONENT
const UsersAdminAuthed = () => {
  // TRPC
  // const fetchAllUsers = api.admin.getAllUsers.useQuery();
  // const updateUser = api.admin.updateUser.useMutation();
  // const deleteUser = api.admin.deleteUser.useMutation();

  // RETURN
  return (
    <div className="flex min-h-screen w-full flex-col items-center p-8 text-xl ">
      <h1>Congratz youre an admin</h1>
      <div className="p-8" />
      <button
        className="button btn-primary max-w-sm rounded-lg p-6"
        onClick={() =>
          console.log("type of fetchAllUsers: ", fetchAllUsers.data)
        }
      >
        Log fetchAllUsers
      </button>
      <div className="p-2" />
      <button
        className="button btn-secondary max-w-sm rounded-lg p-6"
        onClick={() => console.log("type of updateUser: ", updateUser)}
      >
        Log updateUser
      </button>
      <div className="p-2" />
      <button
        className="button btn-accent max-w-sm rounded-lg p-6"
        onClick={() => console.log("type of deleteUser: ", deleteUser)}
      >
        Log deleteUser
      </button>
      <FilterGrid
        dataTitle="Users"
        columns={columns}
        fetchQuery={fetchAllUsers}
        updateMutation={updateUser}
        deleteMutation={deleteUser}
      />
    </div>
  );
};
export default UsersAdminAuthed;
