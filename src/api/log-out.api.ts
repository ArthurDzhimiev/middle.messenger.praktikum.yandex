import { HTTPTransport } from "../utils/fetch";
import { BaseAPI } from "../utils/base-api";

const signInAPIInstance = new HTTPTransport();

export class LogOutAPI extends BaseAPI {
  create() {
    return signInAPIInstance
      .post("/auth/logout")
  }
}
