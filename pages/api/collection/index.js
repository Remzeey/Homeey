import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { userId } = session;
  if (session) {
    if (req.method === "POST") {
      try {
        const client = await clientPromise;
        const db = client.db("HOMELAND");
        const { room } = req.body;
        const { name, price, picture, _id } = room;
        console.log(room);

        const response = await db.collection("collection").insertOne({
          name,
          price,
          picture,
          userId: ObjectId(userId),
          itemId: ObjectId(_id),
        });
        res
          .status(200)
          .json({ msg: "Added to your collection", data: response });
      } catch (error) {
        res.status(404).json({ msg: "failed", data: response });
      }
    } else if (req.method === "GET") {
      try {
        const client = await clientPromise;
        const db = client.db("HOMELAND");

        const response = await db
          .collection("collection")
          .find({ userId: ObjectId(userId) })
          .sort({ picture: 1 })
          .limit(21)
          .toArray();
        res.status(200).json({ msg: "collection", data: response });
      } catch (error) {}
    }
  } else {
    res.status(401).json({ error: "unauthenticated user" });
  }
}
