import { app } from "../../../src/app";
import { BasicAuthCredentials, HttpErrorResponse } from "../../../src/core/models/http-client";
import { HttpClient } from "../../../src/core/utils/http-client";
const testingCreds = require("../../credentials.json");

describe("commit-count.ts::integration", () => {
  describe("listCommitCounts", () => {
    let server: any;
    let testPort = 3032;

    beforeAll(() => {
      server = app.listen(testPort, () => {
        console.log(`Started test server on port ${testPort}`);
      });
    });

    test("should return a 200 when the given repo has 0 open pull requests", async () => {
      const http = HttpClient.getInstance();
      const auth = testingCreds.ghAccount && testingCreds.ghToken
        ? new BasicAuthCredentials(testingCreds.ghAccount, testingCreds.ghToken)
        : undefined;

      const response = await http.get<any>(
        `http://localhost:${testPort}/v1/commit_counts?owner=brian-byungsookim&repo=whose-commit-is-it-anyways`,
        { auth }
      );

      expect(response.status).toEqual(200);
    })

    test("should return a 400 when the given repo does not exist", async () => {
      const http = HttpClient.getInstance();
      const auth = testingCreds.ghAccount && testingCreds.ghToken
        ? new BasicAuthCredentials(testingCreds.ghAccount, testingCreds.ghToken)
        : undefined;

      try {
        await http.get<any>(
          `http://localhost:${testPort}/v1/commit_counts?owner=brian-byungsookim&repo=DNE`,
          { auth }
        );
      } catch (err: any) {
        expect((<HttpErrorResponse>err).status).toEqual(400);
      }
    })

    afterAll(() => {
      server.close();
    });
  })
});
