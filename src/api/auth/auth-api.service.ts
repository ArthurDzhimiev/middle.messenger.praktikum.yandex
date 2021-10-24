import { HTTPTransport } from "../../utils/api/fetch";
import { SignInData, SignupData } from "./auth-api.model";

const APIInstance = new HTTPTransport();

export default class AuthApiService {
  private static __instance: AuthApiService;

  constructor() {
    if (AuthApiService.__instance) {
      return AuthApiService.__instance;
    }
    AuthApiService.__instance = this;
  }

  signIn(data: SignInData): Promise<XMLHttpRequest> {
    return APIInstance.post("auth/signin", { data });
  }

  signUp(data: SignupData): Promise<XMLHttpRequest> {
    return APIInstance.post("auth/signup", { data });
  }

  getUser(): Promise<XMLHttpRequest> {
    return APIInstance.get("auth/user");
  }

  logout(): Promise<XMLHttpRequest> {
    return APIInstance.post("auth/logout");
  }
}
