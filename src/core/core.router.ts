import express from "express";

import { listCommitCounts } from "./controllers";

export const coreRouter = express.Router();

coreRouter.get("/commit_counts", listCommitCounts);
