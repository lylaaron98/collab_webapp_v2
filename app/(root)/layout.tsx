import Narbar from "@/components/shared/navbar/Narbar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="background-light850_dark100 relative">
      <Narbar />
      <section className="flex min-h-screen w-full pb-6 pt-36 max-md:pb-14">
        {children}
      </section>
    </main>
  );
};

export default Layout;
