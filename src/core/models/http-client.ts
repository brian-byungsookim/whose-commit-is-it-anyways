export type HttpHeaders = Record<string, string | number | boolean>;
export type HttpMethod = "GET" | "get" /* | "POST" | "PUT" | "DELETE" */;

export class BasicAuthCredentials {
  constructor(
    public username: string,
    public password: string
  ) { }
}

export class HttpRequestConfig {
  constructor(
    public url?: string,
    public method?: HttpMethod,
    public headers?: HttpHeaders,
    public auth?: BasicAuthCredentials,
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

export class HttpErrorResponse extends Error {
  constructor(
    public data: any,
    public status: number,
    public headers: HttpHeaders,
    public message: string
  ) {
    super(message);
  }
}
