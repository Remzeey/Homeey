import clientPromise from "../../../lib/mongodb";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    if (req.method === "POST") {
      try {
        const client = await clientPromise;
        const db = client.db("HOMELAND");
        const { postItem } = req.body;
        const { name, price, picture, collection } = postItem;

        const response = await db.collection(collection).insertOne({
          name,
          price,
          picture,
        });

        res
          .status(200)
          .json({ msg: `Added to  ${collection} collection`, data: response });
      } catch (error) {
        res
          .status(404)
          .json({ msg: "failed", data: "failed to create new collection" });
      }
    } else if (req.method === "GET") {
      const { collection, name } = req.query;
      try {
        const client = await clientPromise;
        const db = client.db("HOMELAND");
        const response = await db
          .collection(collection)
          .findOne({ name: name });
        if (response) {
          res.status(200).json({ msg: "collection", data: response });
        }

        res.status(404).json({ msg: "item not found" });
      } catch (error) {
        res.status(404).json({ msg: "failed", data: "failed to get item" });
      }
    } else if (req.method === "DELETE") {
      const { collection, name } = req.query;
      try {
        const client = await clientPromise;
        const db = client.db("HOMELAND");
        const response = await db
          .collection(collection)
          .deleteOne({ name: name });

        res.status(200).json({ msg: "item deleted", data: response });
      } catch (error) {
        res.status(404).json({ msg: "failed", data: "failed to delete item" });
      }
    } else if (req.method === "PATCH") {
      const { updateItem } = req.body;
      const { name, price, picture, collection } = updateItem;
      try {
        const client = await clientPromise;
        const db = client.db("HOMELAND");
        const response = await db.collection(collection).updateOne(
          { name: name },
          {
            $set: {
              price,
            },
          }
        );

        res.status(200).json({ msg: "item updated", data: response });
      } catch (error) {
        res.status(404).json({ msg: "failed", data: "failed to update item" });
      }
    }
  } else {
    res.status(404).json({ error: "unauthenticated user" });
  }
}
