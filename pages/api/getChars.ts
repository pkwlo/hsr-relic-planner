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

    const characterList: { char: string }[] = [];

    for (let i = 0; i < userDoc.setId.length; i++) {
      const setId = userDoc.setId[i];
      const foundRelic = await db.collection("relics").findOne({ setId });
      if (!foundRelic) {
        return res.status(404).json({ message: "Relic not found." });
      } else {
        const character = foundRelic.character;
        if (!characterList.some((item) => item.char === character)) {
          characterList.push({ char: character });
        }
      }
    }

    return res.status(200).json(characterList);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
