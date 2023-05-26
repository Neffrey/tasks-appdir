"use client"

// LIBRARIES
import type { User } from "@prisma/client";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { useZact } from "zact/client";

// COMPONENTS
import { getMyUser } from "~/actions/userActions";
import IfUser from "~/components/helpers/ifUser";
import AccountAuthed from "~/components/page-templates/accountAuthed";
import PageUnauthed from "~/components/page-templates/pageUnauthed";
import { LoadingPage } from "~/components/templates/loading";

// PAGE
const Account = () => {
  // Session
  const { data: session } = useSession();

  // Server Actions
  const {
    mutate: getMyUserMutation,
    data: getMyUserData,
    isLoading: getMyUserIsLoading,
  } = useZact(getMyUser);
  if (session) getMyUserMutation({ userId: session.user.id });

  const headTitle =
    getMyUserData && !getMyUserIsLoading
      ? `${getMyUserData.name}'s Account Details`
      : "Sign into your account";
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta name="description" content="View & Edit Account Details" />
        <link rel="icon" href="/CircleLogoIco.ico" />
      </Head>

      <main className="min-w-full">
        {IfUser(
          <AccountAuthed user={getMyUserData} />,
          <PageUnauthed />,
          <LoadingPage />
        )}
      </main>
    </>
  );
};

export default Account;
