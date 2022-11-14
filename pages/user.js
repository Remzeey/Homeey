import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import clientPromise from "../lib/mongodb";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";

const User = ({ collect }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "unauthenticated") {
    router.push("/");
  }

  const [collections, setCollections] = useState(collect);

  const getCollection = async () => {
    try {
      const response = await fetch(`/api/collection`, {
        method: "GET",
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCollections(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const remove = async (id) => {
    try {
      const response = await fetch(`/api/collection/${id}`, {
        method: "DELETE",
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      getCollection();
      alert("Deleted from collection");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen  ">
      <div className="flex justify-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-10 h-10 m-1 sm:w-24 sm:h-24 sm:m-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
      <div>
        <p className="flex justify-end m-1 sm:m-1 text-xs sm:text-xl font-bold">
          {session.user.name}
        </p>
      </div>

      <label className="font-bold text-xs sm:text-lg text-center w-3/6 lg:w-2/12 flex m-1 flex-col">
        Email
        <input
          type="text"
          value={session.user.email}
          disabled
          className=" font-normal text-xs sm:text-lg border-2  text-center rounded-md  bg-slate-200 disabled:cursor-not-allowed "
        />
      </label>

      <h1 className="font-bold text-xs sm:text-lg text-center m-1  ">
        COLLECTIONS
      </h1>
      <hr />
      <div className="flex flex-wrap w-2/3 justify-around p-12 gap-6 mx-auto">
        {collections.map((collection) => {
          return (
            <div
              key={collection._id}
              className="m-6 flex rounded-lg shadow-xl flex-col"
            >
              <Link href={`/livingroom/${collection._id}`}>
                <a>
                  <Image
                    src={collection.picture}
                    alt="collection room"
                    width={240}
                    height={160}
                    placeholder="blur"
                    blurDataURL={collection.picture}
                  />
                  <hr />
                  <p className="text-center font-bold capitalize text-pink-600 text-xs sm:text-lg">
                    {collection.name}
                  </p>
                  <p className="text-center font-bold text-xs sm:text-lg">
                    {collection.price}
                  </p>
                </a>
              </Link>
              <button
                onClick={() => remove(collection._id)}
                className="text-xs sm:text-sm rounded-lg mx-auto flex justify-center items-center hover:text-red-600 text-center border-2 border-slate-800 text-red w-11/12 p-2 m-2"
              >
                Remove{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default User;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db("HOMELAND");

      const collect = await db
        .collection("collection")
        .find({ userId: ObjectId(session.userId) })
        .sort({ picture: 1 })
        .limit(21)
        .toArray();

      return {
        props: {
          collect: JSON.parse(JSON.stringify(collect)),
          session: session,
        },
      };
    } catch (error) {
      console.log(error);
    }
  }
  if (!session) {
    return {
      redirect: {
        destination: "/", //you can use environment variable to hide call back url
        permanent: false,
      },
    };
  }
}
