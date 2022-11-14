import React from "react";
import { ObjectId } from "mongodb";
import clientPromise from "../../lib/mongodb";
import Image from "next/image";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

const Room = ({ room }) => {
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
    <div className="min-h-screen">
      <div className="flex justify-center m-3  mt-24 ">
        <div className="flex  flex-col justify-between gap-10 lg:flex-row ">
          <div>
            <Image
              src={room.picture}
              alt="room"
              width={400}
              height={400}
              placeholder="blur"
              blurDataURL={room.picture}
            />
          </div>

          <div className="flex flex-col gap-10 ">
            <p className="text-lg font-semibold text-slate-500 text-justify ">
              HOMELAND COMPANY
            </p>
            <p className="font-bold text-2xl text-center capitalize ">
              {room.name}
            </p>
            <p className="font-bold text-slate-800 text-xl  ">
              {" "}
              Price: {room.price}.00
            </p>
            <button
              onClick={() => addToCollection(room)}
              className="bg-slate-800 mx-auto rounded-lg shadow-2xl w-2/3 lg:w-full text-white font-bold p-1"
            >
              ADD TO COLLECTION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;

export async function getServerSideProps(context) {
  const { params } = context;
  const { bedroomid } = params;

  try {
    const client = await clientPromise;
    const db = client.db("HOMELAND");

    const room = await db
      .collection("bedroom")
      .findOne({ _id: ObjectId(bedroomid) });

    return {
      props: {
        room: JSON.parse(JSON.stringify(room)),
      },
    };
  } catch (error) {
    console.log(error);
  }
}
