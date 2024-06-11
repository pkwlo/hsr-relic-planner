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

    if (!Array.isArray(userDoc.setId) || userDoc.setId.length === 0) {
      return res.status(404).json({ message: "No relics found." });
    }

    const relicArray = await Promise.all(
      userDoc.setId.map(async (setId) => {
        const relicTarget = await db.collection("relics").findOne({ setId });
        if (relicTarget) {
          return {
            name: relicTarget.name || null,
            character: relicTarget.character || null,
            hatStats: relicTarget.hatStats || null,
            gloveStats: relicTarget.gloveStats || null,
            shoesStats: relicTarget.shoesStats || null,
            bodyStats: relicTarget.bodyStats || null,
            sphereStats: relicTarget.sphereStats || null,
            ropeStats: relicTarget.ropeStats || null,
          };
        } else {
          return null;
        }
      }),
    );

    // Filter out any null values in case a relicTarget was not found
    const filteredRelicArray = relicArray.filter((relic) => relic !== null);

    return res.status(200).json(filteredRelicArray);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
