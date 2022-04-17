import express from "express";

import { HttpErrorResponse } from "../../../src/core/models/http-client";
import { HttpClient } from "../../../src/core/utils/http-client";
import { errorHandler } from "../../../src/core/middleware/error-handler";
import { APIError } from "../../../src/core/models";

describe("error-handler.ts::integration", () => {
  describe("errorHandler", () => {
    let server: any;
    let testPort = 3031;

    beforeAll(() => {
      const app = express();
      app.get("/api_error", (_, __) => {
        throw new APIError("TEST", "TEST APIERROR", 400);
      });

      app.get("/error", (_, __) => {
        throw new Error("TEST ERROR");
      });

      app.use(errorHandler);

      server = app.listen(testPort, () => {
        console.log(`Started test server on port ${testPort}`);
      });
    });

    test("should catch APIError objects and return a 400 with an error body", async () => {
      const http = HttpClient.getInstance();

      try {
        await http.get<any>(`http://localhost:${testPort}/api_error`);
      } catch (err) {
        expect((<HttpErrorResponse>err).status).toEqual(400);
        expect((<HttpErrorResponse>err).data).toEqual({
          name: "TEST",
          message: "TEST APIERROR",
          status: 400,
        });
      }
    })

    test("should catch Error objects and return a 400 with an error body", async () => {
      const http = HttpClient.getInstance();

      try {
        await http.get<any>(`http://localhost:${testPort}/error`);
      } catch (err) {
        expect((<HttpErrorResponse>err).status).toEqual(400);
        expect((<HttpErrorResponse>err).data).toEqual({
          name: "GENERAL",
          message: "TEST ERROR",
          status: 400,
        });
      }
    })

    afterAll(() => {
      server.close();
    });
  })
});
