"use client";

// LIBRARIES
import Head from "next/head";

// COMPONENTS
import IfAdmin from "~/components/helpers/ifAdmin";
import UsersAdminAuthed from "~/components/page-templates/usersAdminAuthed";
import PageUnauthed from "~/components/page-templates/pageUnauthed";
import { LoadingPage } from "~/components/templates/loading";

// PAGE
const Users = () => {
  // HEAD INFO
  const headTitle = IfAdmin(
    "All User Account Details",
    "Sign into your account"
  );
  return (
    <>
      <Head>
        <title>{headTitle}</title>
        <meta
          name="description"
          content="View & Edit All User Account Details"
        />
        <link rel="icon" href="/CircleLogoIco.ico" />
      </Head>

      <main className="min-w-full">
        {IfAdmin(<UsersAdminAuthed />, <PageUnauthed />, <LoadingPage />)}
      </main>
    </>
  );
};

export default Users;
