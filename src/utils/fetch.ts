enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface HTTPOptions {
  timeout?: number;
  headers?: Record<string, string>;
  data?: Record<string, unknown> | null;
}

function queryStringify(data) {
  let stringifyData = "";
  Object.keys(data).forEach((key, i) => {
    const value = Array.isArray(data[key])
      ? data[key].join(",")
      : `${data[key]}`;
    return (stringifyData += `${i === 0 ? "?" : "&"}${key}=${value}`);
  });
  return stringifyData;
}

export class HTTPTransport {
  get = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.GET, options, options.timeout);
  };
  put = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.PUT, options, options.timeout);
  };
  post = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.POST, options, options.timeout);
  };
  delete = (url: string, options: HTTPOptions) => {
    return this.request(url, METHODS.DELETE, { ...options }, options.timeout);
  };

  request(url: string, method: METHODS, options: HTTPOptions, timeout = 5000) {
    const data = options.data;
    const headers = options.headers || {};
    if (!headers.contentType) {
      headers.contentType = "application/json";
    }
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url + (data ? queryStringify(data) : ""));
      xhr.timeout = timeout;
      xhr.onload = function () {
        resolve(xhr);
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
        xhr.send(data);
      }
    });
  }
}
