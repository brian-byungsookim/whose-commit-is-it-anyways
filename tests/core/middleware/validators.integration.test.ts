import express from "express";

import { HttpErrorResponse } from "../../../src/core/models/http-client";
import { HttpClient } from "../../../src/core/utils/http-client";
import { validateOwnerAndRepo } from "../../../src/core/middleware/validators";

describe("validators.ts::integration", () => {
  describe("validateOwnerAndRepo", () => {
    let server: any;
    let testPort = 3030;

    beforeAll(() => {
      const app = express();
      app.get("/", validateOwnerAndRepo, (_, res) => {
        res.status(200).json({ result: "success" });
      });

      server = app.listen(testPort, () => {
        console.log(`Started test server on port ${testPort}`);
      });
    });

    test("should pass the request through when the request contains the necessary query params", async () => {
      const http = HttpClient.getInstance();
      const { data } = await http.get<any>(`http://localhost:${testPort}?owner=blah&repo=blah`);

      expect(data).toEqual({ result: "success" });
    })

    test("should throw an error when the request is missing one query param", async () => {
      const http = HttpClient.getInstance();

      try {
        await http.get<any>(`http://localhost:${testPort}?owner=blah`);
      } catch (err) {
        expect((<HttpErrorResponse>err).status).toEqual(400);
      }
    })

    test("should throw an error when the request is missing both query params", async () => {
      const http = HttpClient.getInstance();

      try {
        await http.get<any>(`http://localhost:${testPort}`);
      } catch (err) {
        expect((<HttpErrorResponse>err).status).toEqual(400);
      }
    })

    afterAll(() => {
      server.close();
    });
  })
});
