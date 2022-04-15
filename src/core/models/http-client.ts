export type HttpHeaders = Record<string, string | number | boolean>;
export type HttpMethod = "GET" | "get" /* | "POST" | "PUT" | "DELETE" */;

export class HttpRequestConfig {
  constructor(
    public url?: string,
    public method?: HttpMethod,
    public headers?: HttpHeaders,
  ) { }
}

export class HttpResponse<T> {
  constructor(
    public data: T,
    public status: number,
    public headers: HttpHeaders,
    public config: HttpRequestConfig
  ) { }
}

export class HttpErrorResponse<T> extends Error {
  constructor(
    public data: T,
    public status: number,
    public headers: HttpHeaders,
    public message: string
  ) {
    super(message);
  }
}
