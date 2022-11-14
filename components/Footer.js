import React from "react";
import { SocialIcon } from "react-social-icons";
import Link from "next/link";

const Footer = () => {
  return (
    <div className=" h-fit p-5 w-screen  bg-slate-800  text-white ">
      <div className="m-1">
        <Link href="/about">
          <a>
            <p className="cursor-pointer text-gray-500 w-fit hover:text-white">
              About us
            </p>
          </a>
        </Link>
        <Link href="/contact">
          <a>
            <p className="cursor-pointer text-gray-500 w-fit hover:text-white">
              Contact us
            </p>
          </a>
        </Link>
      </div>
      <p className="flex justify-end  m-1  sm:text-xl font-bold ">
        Connect with us on
      </p>
      <div className=" flex justify-end mb-12 ">
        <SocialIcon
          url="https://facebook.com"
          style={{ height: 25, width: 25, margin: 1 }}
        />
        <SocialIcon
          url="https://instagram.com"
          style={{ height: 25, width: 25, margin: 1 }}
        />
        <SocialIcon
          url="https://twitter.com"
          style={{ height: 25, width: 25, margin: 1 }}
        />
      </div>

      <div className=" text-center  ">&copy; 2022 Remzeey</div>
    </div>
  );
};

export default Footer;
