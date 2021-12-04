export enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface HTTPOptions {
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, any> | null;
}

const BASE_URL = "https://ya-praktikum.tech/api/v2/";

export class HTTPTransport {
  private baseUrl: string;

  constructor(baseUrl: string = BASE_URL) {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: HTTPOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, METHODS.GET, options, options.timeout);
  };
  put = (url: string, options: HTTPOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, METHODS.PUT, options, options.timeout);
  };
  post = (url: string, options: HTTPOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, METHODS.POST, options, options.timeout);
  };
  delete = (
    url: string,
    options: HTTPOptions = {}
  ): Promise<XMLHttpRequest> => {
    return this.request(url, METHODS.DELETE, { ...options }, options.timeout);
  };

  request(
    url: string,
    method: METHODS,
    options: HTTPOptions,
    timeout = 5000
  ): Promise<XMLHttpRequest> {
    const data = options.data;
    const headers = options.headers || {};
    if (
      !headers["content-type"] &&
      !(data && data instanceof window.FormData)
    ) {
      headers["content-type"] = "application/json";
    }
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, this.baseUrl + url);
      xhr.timeout = timeout;
      xhr.withCredentials = true;
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(xhr.response);
        } else {
          reject({
            status: this.status,
            statusText: JSON.parse(this.response),
          });
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      for (let key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
      if (method === METHODS.GET) {
        xhr.send();
      } else {
        if (data instanceof window.FormData) {
          xhr.send(data);
        } else {
          xhr.send(JSON.stringify(data));
        }
      }
    });
  }
}
