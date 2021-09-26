import { HTTPTransport } from "../utils/fetch";
import { BaseAPI } from "../utils/base-api";

const signUpAPIInstance = new HTTPTransport();

export class SignUpApi extends BaseAPI {
  create(data: any) {
    return signUpAPIInstance.post("/auth/signup", { data: data });
  }
}
