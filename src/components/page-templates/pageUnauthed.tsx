// LIBRARIES
import { signIn } from "next-auth/react";

// FC
const PageUnauthed = () => {
  return (
    <div className="flex h-full min-h-screen w-full flex-col items-center justify-center">
      <div className="pt-4 text-3xl">
        {"Please "}
        <span
          className="cursor-pointer text-primary underline"
          onClick={() => void signIn()}
        >
          Login
        </span>
        {" to access page"}
      </div>
    </div>
  );
};
export default PageUnauthed;
