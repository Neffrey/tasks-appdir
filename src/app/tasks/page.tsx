"use client"

// LIBRARIES
import type { User } from "@prisma/client";
import Head from "next/head";
import { useSession } from "next-auth/react";
// import { useZact } from "zact/client";

// COMPONENTS
import IfUser from "~/components/helpers/ifUser";
import TasksAuthed from "~/components/page-templates/tasksAuthed";
import PageUnauthed from "~/components/page-templates/pageUnauthed";
import { LoadingPage } from "~/components/templates/loading";


// PAGE
const Account = () => {
  // Session
  const { data: session } = useSession();
  const headTitle = session?.user?.name
    ? `${session.user.name}'s Account Details`
    : "Sign into your account";
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="View & Edit Tasks" />
        <link rel="icon" href="/CircleLogoIco.ico" />
      </Head>

      <main className="min-w-full">
        {IfUser(<TasksAuthed />, <PageUnauthed />, <LoadingPage />)}
      </main>
    </>
  );
};
export default Account;
