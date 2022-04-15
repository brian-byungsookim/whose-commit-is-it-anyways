import { GitHubCommitResponse, GitHubPullRequest } from "../../../src/core/models/github";
import { BasicAuthCredentials, HttpErrorResponse, HttpResponse } from "../../../src/core/models/http-client";
import { listCommitsOnPullRequest, listPullRequests } from "../../../src/core/services/github-pulls";
const testingCreds = require("../../credentials.json");

describe("github-pulls.ts::integration", () => {
  describe("listPullRequests", () => {
    test("should list requests from a valid GitHub owner & repo", async () => {
      const auth = testingCreds.ghAccount && testingCreds.ghToken
        ? new BasicAuthCredentials(testingCreds.ghAccount, testingCreds.ghToken)
        : undefined;
      const response: HttpResponse<GitHubPullRequest[]> =
        await listPullRequests("facebook", "jest", { auth });

      expect(response.status).toEqual(200);
    });

    test("should fail when given an invalid GitHub repo", async () => {
      try {
        const auth = testingCreds.ghAccount && testingCreds.ghToken
          ? new BasicAuthCredentials(testingCreds.ghAccount, testingCreds.ghToken)
          : undefined;

        await listPullRequests("facebook", "doesntexist", { auth });
      } catch (err: any) {
        expect((<HttpErrorResponse>err).status).toEqual(404);
      }
    });
  });

  describe("listCommitsOnPullRequest", () => {
    test("should list commits on an open pull request on a valid GitHub owner & repo", async () => {
      const auth = testingCreds.ghAccount && testingCreds.ghToken
        ? new BasicAuthCredentials(testingCreds.ghAccount, testingCreds.ghToken)
        : undefined;

      // note: if this test reliably fails, it's possible PR 5995
      //   (https://github.com/facebook/jest/pull/5995) is no longer open.
      const response: HttpResponse<GitHubCommitResponse[]> =
        await listCommitsOnPullRequest("facebook", "jest", 5995, { auth });

      expect(response.status).toEqual(200);
    });

    test("should fail when given an invalid GitHub repo", async () => {
      try {
        const auth = testingCreds.ghAccount && testingCreds.ghToken
          ? new BasicAuthCredentials(testingCreds.ghAccount, testingCreds.ghToken)
          : undefined;

        await listCommitsOnPullRequest("facebook", "doesntexist", 5995, { auth });
      } catch (err: any) {
        expect((<HttpErrorResponse>err).status).toEqual(404);
      }
    });
  });
});
