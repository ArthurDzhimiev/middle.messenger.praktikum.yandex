import { Router } from "../utils/router";
import { deleteUser, setUser } from "../store/user";
import { store } from "../store/index";
import { SignupData } from "../api/auth/auth-api.model";
import AuthApiService from "../api/auth/auth-api.service";
import {settFormErr} from "../utils/validation";

const authService = new AuthApiService();
const router = new Router("#app");

export class AuthController {
  private static __instance: AuthController;

  constructor() {
    if (AuthController.__instance) {
      return AuthController.__instance;
    }
    AuthController.__instance = this;
  }
  async signIn(data: SignupData) {
    try {
      await authService.signIn(data);
      await this.getUser();
    } catch (e) {
      settFormErr(e)
    }
  }

  async signUp(data: SignupData) {
    try {
      await authService.signUp(data);
      await this.getUser();
    } catch (e) {
      settFormErr(e)
    }
  }

  async logOut() {
    try {
      await authService.logout();
      router.go("/");
    } catch (e) {
      settFormErr(e)
    }
  }

  async getUser() {
    try {
      const user: any = await authService.getUser();
      store.dispatch(setUser(JSON.parse(user)));
      if (router._currentRoute) {
        const currentPath = router._currentRoute._pathname;
        if (currentPath === "/" || currentPath === "/sign-up") {
          router.go("/messenger");
        }
      }
      return user;
    } catch (e) {
      store.dispatch(deleteUser());
      router.go("/");
    }
  }
}
