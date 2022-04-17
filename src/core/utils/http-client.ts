import axios, { AxiosRequestHeaders, AxiosError, AxiosRequestConfig } from "axios";
import { BasicAuthCredentials, HttpErrorResponse, HttpHeaders, HttpMethod, HttpRequestConfig, HttpResponse } from "../models";

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

  public async get<T>(
    url: string,
    opts?: { headers?: HttpHeaders, auth?: BasicAuthCredentials, params?: any }
  ): Promise<HttpResponse<T>> {
    return this.makeRequest<T>(url, "GET", opts);
  }

  private async makeRequest<T>(
    url: string,
    method: HttpMethod,
    opts?: { headers?: HttpHeaders, auth?: BasicAuthCredentials, params?: any }
  ): Promise<HttpResponse<T>> {
    try {
      const requestConfig: AxiosRequestConfig<T> = {
        url,
        method,
        headers: { ...opts?.headers, ...this.DEFAULT_HEADERS },
        auth: opts?.auth,
        params: opts?.params
      };
      const response = await axios.request<T>(requestConfig);

      return new HttpResponse<T>(
        response.data,
        response.status,
        response.headers,
        new HttpRequestConfig(
          response.config.url,
          response.config.method as HttpMethod,
          response.config.headers,
          response.config.auth,
        )
      );
    } catch (err: any) {
      if (this.isAxiosError(err)) {
        throw new HttpErrorResponse(
          err.response?.data || {},
          err.response?.status || 500,
          err.response?.headers || {},
          err.response?.statusText || "Unexpected error"
        );
      } else {
        throw new HttpErrorResponse({}, 500, {}, "Something went really wrong");
      }
    }
  }

  private isAxiosError(err: any): err is AxiosError {
    return err?.isAxiosError;
  }
}
