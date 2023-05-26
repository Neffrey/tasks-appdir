// LIBRARIES
import Link from "next/link";
import React from "react";
// import { FaBars } from "react-icons/fa";

// COMPONENTS
import NeffreyLogo from "~/components/svgs/neffreyLogo";

// MENU
const menuItems = [
  { title: "Tasks", link: "/tasks" },
  { title: "Account", link: "/account" },
];

// COMPONENT
const Header = () => {
  return (
    <div
      // Row Container
      className="flex w-full items-center justify-between border-b-4 border-solid border-neutral bg-gradient-to-r from-primary to-secondary px-5 py-2 shadow-xl"
    >
      <div
        // Logo Container
        className="h-12 w-12 cursor-pointer fill-white"
      >
        <NeffreyLogo />
      </div>

      <div className="flex items-center justify-between gap-5 text-lg font-semibold lowercase tracking-widest text-white">
        {menuItems.map((item) => {
            return (
              <Link href={item.link} key={item.title}>
                {item.title}
              </Link>
            );
        })}
      </div>
    </div>
  );
};
export default Header;
