import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Theme from "./Theme";
import MobileNav from "./MobileNav";
import NavLinks from "./NavLinks";

const Narbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/assets/images/site-logo-light.png"
          alt="Choremaster Logo"
          width={80}
          height={61}
          className="dark:hidden"
        />

        <Image
          src="/assets/images/site-logo.png"
          alt="Choremaster Logo"
          width={80}
          height={61}
          className="hidden dark:block"
        />

        <div className="flex flex-col">
          <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
            Chore <span className="text-primary-500">Master</span>
          </p>
          <p className="text-dark-100 dark:text-light-900">
            Simplify tasks, Master time
          </p>
        </div>
      </Link>
      {/* <GlobalSearch /> */}
      <NavLinks />

      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};
export default Narbar;
