import React from "react";
import Image from "next/image";
import img from "../public/logo.png";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className=" bg-slate-800 sticky top-0 z-10 text-white flex flex-row justify-end sm:justify-around items-center h-16 w-screen  ">
      <div className="font-bold  cursor-pointer text-xs md:text-base flex flex-row justify-center items-center ml-1 gap-1 lg:text-xl">
        <div>
          <Image
            src={img}
            alt="logo_image"
            width={30}
            height={30}
            className="rounded-full "
          />
        </div>
        <div>
          <Link href="/">
            <a>HOMELAND</a>
          </Link>
        </div>
      </div>

      <div className=" ml-16 flex flex-row justify-between items-center gap-3">
        <div className="flex text-xs sm:text-lg flex-row gap-2">
          {/* <Link href="/">
            <p className="cursor-pointer ">
              <a>HOME</a>
            </p>
          </Link> */}

          {!session && (
            <Link href="/Signin">
              <p className="cursor-pointer text-xs sm:text-lg ">
                <a>SIGN IN</a>
              </p>
            </Link>
          )}

          {/* {!session && <p className="cursor-pointer ">SIGN UP</p>} */}
          {session && (
            <p className="cursor-pointer " onClick={() => signOut()}>
              SIGN OUT
            </p>
          )}
        </div>

        {session && (
          <div className=" flex flex-row text-sm mr-1 cursor-pointer  items-center ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>

            <Link href="/user">
              <a>
                <p>{session.user.name.split(" ")[0]}</p>
              </a>
            </Link>
          </div>
        )}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg> */}
      </div>
    </div>
  );
};

export default Header;
