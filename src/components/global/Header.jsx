import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="sticky top-0 left-0 p-4 shadow bg-white/30 backdrop-blur-xs">
      <nav className="flex items-center gap-4 mx-auto max-w-4xl">
        <Link href={"/"} className="text-3xl">
          🩺
        </Link>
        <Link href={"/"}>
          <p className="font-bold hover:underline text-sm text-blue-500 ">
            Staff View
          </p>
        </Link>
        <Link href={"/patient"}>
          <p className="font-bold hover:underline text-sm text-blue-500">
            Patient form
          </p>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
