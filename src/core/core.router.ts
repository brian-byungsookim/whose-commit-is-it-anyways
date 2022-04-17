import express from "express";

import { listCommitCounts } from "./controllers";
import { validateOwnerAndRepo } from "./middleware";

export const coreRouter = express.Router();

coreRouter.get("/commit_counts", validateOwnerAndRepo, listCommitCounts);
