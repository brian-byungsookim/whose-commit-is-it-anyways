import { Response } from "express";

export function listCommitCounts(_: any, res: Response) {
  res.status(200).json({ hello: "world" });
};
