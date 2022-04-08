import express from "express";

import { coreRouter } from "./core";

export const app = express();

app.use("/v1", coreRouter);
