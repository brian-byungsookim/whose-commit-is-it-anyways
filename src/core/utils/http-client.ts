import axios, { AxiosRequestHeaders, AxiosError } from "axios";
import { HttpErrorResponse, HttpHeaders, HttpMethod, HttpRequestConfig, HttpResponse } from "../models";

export class HttpClient {
  private static client: HttpClient;
  public DEFAULT_HEADERS: AxiosRequestHeaders;

  public static getInstance(): HttpClient {
    if (!HttpClient.client) {
      HttpClient.client = new HttpClient("whose-commit-is-it-anyways");
    }

    return HttpClient.client;
  }

  private constructor(
    private userAgent: string
  ) {
    this.DEFAULT_HEADERS = {
      "User-Agent": this.userAgent
    };
  }

  public async get<T>(url: string, headers?: HttpHeaders): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, "GET", { headers });
  }

  private async makeRequest<T>(
    url: string,
    method: HttpMethod,
    opts?: { headers?: HttpHeaders }
  ): Promise<HttpResponse<T>> {
    try {
      const response = await axios.request<T>({ url, method, headers: { ...opts?.headers, ...this.DEFAULT_HEADERS } });

      return new HttpResponse<T>(
        response.data,
        response.status,
        response.headers,
        new HttpRequestConfig(
          response.config.url,
          response.config.method as HttpMethod,
          response.config.headers
        )
      );
    } catch (err: any) {
      if (this.isAxiosError(err)) {
        throw new HttpErrorResponse<T>(
          err.response?.data || {},
          err.response?.status || 500,
          err.response?.headers || {},
          "TODO: error message"
        );
      } else {
        throw new HttpErrorResponse<T>({} as T, 500, {}, "Something went really wrong");
      }
    }
  }

  private isAxiosError(err: any): err is AxiosError {
    return err?.isAxiosError;
  }
}
