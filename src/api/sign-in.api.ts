import { HTTPTransport } from "../utils/fetch";
import { BaseAPI } from "../utils/base-api";

const signInAPIInstance = new HTTPTransport();

export class SignInAPI extends BaseAPI {
  create(data: any) {
    return signInAPIInstance
      .post("/auth/signin", { data: data })
  }

  request() {
    return signInAPIInstance
      .get("/auth/user")
      .then((res: string) => JSON.parse(res));
  }
}
