import { Request, Response } from "express";

export function listCommitCounts(req: Request, res: Response) {
  console.log(`[200]: Found x commits`);
  res.status(200).json({ hello: "world" });
};
