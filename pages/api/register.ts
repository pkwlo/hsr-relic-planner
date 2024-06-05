import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed." });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const client = await clientPromise;
    const db = client.db("user-info");

    const user = await db.collection("users").findOne({ email });

    if (user) {
      return res.status(409).json({
        success: false,
        message: "Email already exists. Please log in.",
      });
    }

    await db.collection("users").insertOne({
      email,
      password,
    });

    return res.status(200).json({
      success: true,
      message: "User created. Please log in.",
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "An error occurred" });
  }
}
