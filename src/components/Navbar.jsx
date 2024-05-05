import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="bg-teal-800 max-w-5xl text-white mx-auto h-16 my-10 flex rounded-md justify-between items-center px-10">
      <Link href={"/"} className="text-3xl font-bold">
        CRUD
      </Link>
      <Link
        href={"/add_topic"}
        className="font-bold bg-white text-teal-800 py-2 px-5 rounded-md"
      >
        ADD
      </Link>
    </div>
  );
};

export default Navbar;
