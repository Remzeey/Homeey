import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import clientPromise from "../lib/mongodb";

const Home = ({ display }) => {
  return (
    <div className="min-h-screen w-full   flex flex-col justify-center ">
      <Head>
        <title>Homeland home page</title>
      </Head>
      <div className="text-2xl mt-0 text-center h-96 font-extrabold text-blue-900 bg-home bg-cover bg-center bg-no-repeat ">
        HOMELAND
      </div>

      <label className="flex justify-center items-center m-10 relative ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 absolute right-1/4 left-3/4 lg:left-auto lg:right-1/3 m-1 font-bold opacity-40 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          type="text"
          placeholder="Search all Home furnitures ..."
          className="shadow-lg w-2/3 lg:w-1/3  h-14 focus:border-2 rounded-md border-indigo-900 p-3"
        />
      </label>
      <div className="flex justify-around flex-wrap gap-7 w-6/12 mx-auto ">
        {display.map((view) => {
          return (
            <div
              key={view.id}
              className=" shadow-xl rounded-lg cursor-pointer hover:scale-105 hover:ease-in-out hover:transistion hover:duration-150 "
            >
              <Link href={view.link}>
                <a>
                  <Image
                    src={view.picture}
                    alt="place"
                    width={200}
                    height={100}
                    placeholder="blur"
                    blurDataURL={view.picture}
                  />
                  <br />
                  <p className=" p-3 font-sans font-bold text-slate-900 text-sm text-center sm:text-xl">
                    {view.place}
                  </p>
                </a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("HOMELAND");

    const display = await db
      .collection("display")
      .find({})
      .sort({ place: 1 })
      .limit(20)
      .toArray();

    return {
      props: {
        display: JSON.parse(JSON.stringify(display)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
