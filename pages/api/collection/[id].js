import { getSession } from "next-auth/react";
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const { userId } = session;
  if (session) {
    if (req.method === "DELETE") {
      try {
        const client = await clientPromise;
        const { id } = req.query;
        const db = client.db("HOMELAND");
        const response = db
          .collection("collection")
          .deleteOne({ _id: ObjectId(id) });
        res
          .status(200)
          .json({ msg: "deleted from collection", data: response });
      } catch (error) {
        res.status(404).json({ msg: "failed", data: response });
      }
    }
  } else {
    res.status(401).json({ error: "unauthenticated user" });
  }
}
