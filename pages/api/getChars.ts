import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("user-info");
    const userCollection = db.collection("users");

    const userDoc = await userCollection.findOne({ email: user });

    if (!userDoc) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!Array.isArray(userDoc.charList) || userDoc.charList.length === 0) {
      return res.status(404).json({ message: "No characters found." });
    }

    const characterList: { char: string }[] = [];

    userDoc.charList.map((char) => {
      if (char !== "") {
        characterList.push({ char });
      }
    });

    return res.status(200).json(characterList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
