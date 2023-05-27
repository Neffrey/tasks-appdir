"use client"

// LIBRARIES
import { useSession } from "next-auth/react";

// FC
const IfAdmin = (
  authed: React.ReactNode,
  unauthed: React.ReactNode | undefined = undefined,
  loading: React.ReactNode | undefined = undefined
) => {
  // SESSION
  const { data: session, status } = useSession();

  if (status === "loading") return loading;
  if (status === "authenticated" && session?.user?.role === "ADMIN")
    return authed;
  return unauthed;
};

export default IfAdmin;
