"use client"

// LIBRARIES
import { useSession } from "next-auth/react";

// FC
const IfUser = (
  authed: React.ReactNode,
  unauthed: React.ReactNode | undefined = undefined,
  loading: React.ReactNode | undefined = undefined
) => {
  // SESSION
  const { status } = useSession();

  if (status === "loading") return loading;
  if (status === "authenticated") return authed;
  return unauthed;
};

export default IfUser;
