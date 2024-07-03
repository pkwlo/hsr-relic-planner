import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { user, title, description } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("reports");

    const bugCollection = db.collection("bugs");

    await bugCollection.insertOne({
      user,
      title,
      description,
    });

    return res.status(201).json({ success: true, message: "Bug reported." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "An error occurred" });
  }
}
