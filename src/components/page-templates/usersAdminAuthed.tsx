"use client";

// LIBRARIES
import { type User } from "next-auth";
import { useZact } from "zact/client";

// SERVER ACTIONS
import { getAllUsers, deleteUser, updateUser } from "~/actions/adminActions";

// COMPONENTS
import { PartialTypeExcept } from "~/components/helpers/partialTypeExcept";
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

  // SERVER ACTIONS HELPERS
  const getAllUsersZact = useZact(getAllUsers);
  const updateUserZact = useZact(updateUser);
  const deleteUserZact = useZact(deleteUser);

  // FORM HELPERS
  const refreshData = () => getAllUsersZact.mutate({});
  const updateData = (user: User) => updateUserZact.mutate(user);
  const deleteData = (user: User) => deleteUserZact.mutate(user);

  // RETURN
  return (
    <div className="flex min-h-screen w-full flex-col items-center p-8 text-xl ">
      <h1>Congratz youre an admin</h1>
      <div className="p-8" />
      <button
        className="button btn-primary max-w-sm rounded-lg p-6"
        onClick={() =>
          console.log("getAllUsersZact Data: ", getAllUsersZact.data)
        }
      >
        Log getAllUsersZact Data
      </button>
      <div className="p-2" />
      {/* <button
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
      </button> */}
      <FilterGrid
        data={getAllUsersZact.data}
        dataTitlePlural="Users"
        columns={columns}
        refreshData={refreshData}
        updateData={updateData}
        deleteData={deleteData}
      />
    </div>
  );
};
export default UsersAdminAuthed;
