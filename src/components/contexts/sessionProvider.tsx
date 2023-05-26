"use client";

// LIBRARIES
import { SessionProvider as Session } from "next-auth/react";

// TYPES
type Props = {
  children: React.ReactNode;
};

const SessionProvider = ({ children }: Props) => {
  console.log("Session: ", Session);
  return <Session>{children}</Session>;
};

export default SessionProvider;
