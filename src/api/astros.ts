// api/astros.ts
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch("http://api.open-notify.org/astros.json"); // HTTP is fine in serverless
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch astronauts" });
  }
}
