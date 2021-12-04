import { HTTPTransport } from "../../utils/api/fetch";
import { SignInData, SignupData } from "./auth-api.model";

const http = new HTTPTransport();

export default class AuthApiService {
  private static __instance: AuthApiService;

  constructor() {
    if (AuthApiService.__instance) {
      return AuthApiService.__instance;
    }
    AuthApiService.__instance = this;
  }

  signIn(data: SignInData): Promise<XMLHttpRequest> {
    return http.post("auth/signin", { data });
  }

  signUp(data: SignupData): Promise<XMLHttpRequest> {
    return http.post("auth/signup", { data });
  }

  getUser(): Promise<XMLHttpRequest> {
    return http.get("auth/user");
  }

  logout(): Promise<XMLHttpRequest> {
    return http.post("auth/logout");
  }
}
