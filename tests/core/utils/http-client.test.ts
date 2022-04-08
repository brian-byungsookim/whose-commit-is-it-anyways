import { HttpClient } from "../../../src/core/utils/http-client";


describe("http-client.ts", () => {
  describe("getInstance", () => {
    test("should initialize an instance of HttpClient, if currently uninitialized", () => {
      const http = HttpClient.getInstance();

      expect(http).toBeInstanceOf(HttpClient);
      expect(http.DEFAULT_HEADERS).toStrictEqual({ "User-Agent": "whose-commit-is-it-anyways"});
    });

    test("should initialize the 'User-Agent' HTTP header to a default value", () => {
      const http = HttpClient.getInstance();

      expect(http.DEFAULT_HEADERS).toStrictEqual({ "User-Agent": "whose-commit-is-it-anyways"});
    });
  });
});
