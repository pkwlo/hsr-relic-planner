import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

interface User {
  username: string;
  setId: number[];
}

interface RelicSet {
  setId: number;
  name: string;
  hatStats: any;
  gloveStats: any;
  shoesStats: any;
  bodyStats: any;
  character: string;
}

interface OrnamentSet {
  setId: number;
  name: string;
  sphereStats: any;
  ropeStats: any;
  character: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {
    user,
    name,
    type,
    hatStats,
    gloveStats,
    shoesStats,
    bodyStats,
    sphereStats,
    ropeStats,
    character,
  } = req.body;

  try {
    const client = await clientPromise;
    const db = client.db("user-info");

    const usersCollection = db.collection<User>("users");
    const relicsCollection = db.collection<RelicSet | OrnamentSet>("relics");

    const setId = (await relicsCollection.countDocuments()) + 1;

    const newRelicSet: RelicSet = {
      setId,
      name,
      hatStats,
      gloveStats,
      shoesStats,
      bodyStats,
      character,
    };

    const newOrnamentSet: OrnamentSet = {
      setId,
      name,
      sphereStats,
      ropeStats,
      character,
    };

    if (type === "Relic Set") await relicsCollection.insertOne(newRelicSet);
    else await relicsCollection.insertOne(newOrnamentSet);

    await usersCollection.updateOne(
      { email: user },
      { $push: { setId: setId } },
    );

    return res.status(201).json({ success: true, message: "Relic saved." });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "An error occurred" });
  }
}
