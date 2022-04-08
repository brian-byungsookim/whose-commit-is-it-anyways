import { HttpClient, HttpErrorResponse } from "../../../src/core/utils/http-client";


describe("http-client.ts::integration", () => {
  describe("get", () => {
    test("should be able to make an HTTP request", async () => {
      const http = HttpClient.getInstance();
      const { status } = await http.get<any>("https://www.google.com");

      expect(status).toEqual(200);
    });

    test("should throw an HttpErrorResponse when unable to complete the HTTP request", async () => {
      const http = HttpClient.getInstance();
      
      try {
        await http.get<any>("not-a-url");
      } catch (err: any) {
        expect(err).toBeInstanceOf(HttpErrorResponse);
        expect((<HttpErrorResponse<any>>err).status).toEqual(500);
      }
    });
  });
});
