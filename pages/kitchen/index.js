import React from "react";
import Head from "next/head";
import clientPromise from "../../lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Kitchen = ({ kitchen }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const addToCollection = async (room) => {
    if (session) {
      try {
        const response = await fetch("/api/collection", {
          method: "POST",
          body: JSON.stringify({ room }),
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await response.json;
        console.log(data);
        alert("added to collection");
      } catch (error) {
        console.log(error);
      }
    } else {
      router.push("/Signin");
    }
  };
  return (
    <div className="min-h-screen ">
      <Head>
        <title>Kitchen page</title>
        <meta content="Kitchen" description="Various Kitchen designs" />
      </Head>

      <h1 className="text-center font-bold text-4xl mb-2 h-12 mt-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400">
        {" "}
        Kitchen{" "}
      </h1>
      <div className="flex flex-wrap  w-2/3 justify-around p-12 gap-6 mx-auto">
        {kitchen.map((room) => {
          return (
            <div
              key={room._id}
              className="m-6 flex rounded-lg shadow-xl flex-col"
            >
              <Link href={`/kitchen/${room._id}`}>
                <a>
                  <Image
                    src={room.picture}
                    alt="kitchen"
                    width={240}
                    height={160}
                    placeholder="blur"
                    blurDataURL={room.picture}
                  />
                  <hr />
                  <p className="text-center font-bold capitalize text-pink-600 text-base sm:text-lg">
                    {room.name}
                  </p>
                  <p className="text-center font-bold text-base sm:text-lg">
                    {room.price}
                  </p>
                </a>
              </Link>
              <button
                onClick={() => addToCollection(room)}
                className="bg-slate-800 text-xs sm:text-sm rounded-lg mx-auto  text-white w-11/12 p-2 m-2 text-center"
              >
                ADD TO COLLECTION
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Kitchen;

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("HOMELAND");

    const kitchen = await db
      .collection("kitchen")
      .find({})
      .sort({ picture: 1 })
      .limit(21)
      .toArray();

    return {
      props: {
        kitchen: JSON.parse(JSON.stringify(kitchen)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
