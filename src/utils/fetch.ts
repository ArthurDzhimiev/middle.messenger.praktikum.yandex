enum METHODS {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}

interface HTTPOptions {
  timeout?: number | null;
  headers?: Record<string, unknown>;
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

class HTTPTransport {
  get = (url, options: HTTPOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };
  put = (url, options: HTTPOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };
  post = (url, options: HTTPOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };
  delete = (url, options: HTTPOptions) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request(url: string, options, timeout: number) {
    const { method, data } = options;

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
      if (method === METHODS.GET) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}
