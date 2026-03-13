import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user, relicId } = req.body;

  try {
    console.log(user, relicId);
    const client = await clientPromise;
    const db = client.db("user-info");
    const userCollection = db.collection("users");
    const relicCollection = db.collection("relics");

    // Remove the relic ID from the user's setId array
    const updateResult = await userCollection.updateOne(
      { email: user },
      { $pull: { setId: relicId } },
    );

    if (updateResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "Relic not found or already removed from user." });
    }

    // Delete the relic document from the relics collection
    const deleteResult = await relicCollection.deleteOne({ setId: relicId });

    if (deleteResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Relic not found in relics collection." });
    }

    return res.status(200).json({ message: "Relic deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
}
