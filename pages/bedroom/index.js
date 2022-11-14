import React from "react";
import Head from "next/head";
import clientPromise from "../../lib/mongodb";
import Image from "next/image";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Bedroom = ({ bedroom }) => {
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
        <title>Bedroom page</title>
        <meta content="Bedroom" description="Various Bedroom designs" />
      </Head>

      <h1 className="text-center font-bold text-4xl h-12 mt-3 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-rose-400 to-lime-400">
        {" "}
        Bedroom{" "}
      </h1>
      <div className="flex flex-wrap w-screen  justify-around p-12 gap-6 mx-auto">
        {bedroom.map((room) => {
          return (
            <div
              key={room._id}
              className="m-6 flex rounded-lg shadow-xl flex-col"
            >
              <Link href={`/bedroom/${room._id}`}>
                <a>
                  <Image
                    src={room.picture}
                    alt="bedroom"
                    width={240}
                    height={160}
                    placeholder="blur"
                    blurDataURL={room.picture}
                  />
                  <hr />
                  <p className="text-center font-bold capitalize text-pink-600 text-base sm:text-lg">
                    {room.name}
                  </p>
                  <p className="text-center text-base sm:text-lg font-bold">
                    {room.price}
                  </p>
                </a>
              </Link>
              <button
                onClick={() => addToCollection(room)}
                className="bg-slate-800 text-xs sm:text-sm rounded-lg mx-auto sm:font-bold m-2 text-center text-white w-11/12 p-2 "
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

export default Bedroom;

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("HOMELAND");

    const bedroom = await db
      .collection("bedroom")
      .find({})
      .sort({ picture: 1 })
      .limit(21)
      .toArray();

    return {
      props: {
        bedroom: JSON.parse(JSON.stringify(bedroom)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
