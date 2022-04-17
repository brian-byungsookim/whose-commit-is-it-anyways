import express from "express";
import { coreRouter, errorHandler } from "./core";

export const app = express();
app.use("/v1", coreRouter);

app.use(errorHandler);
