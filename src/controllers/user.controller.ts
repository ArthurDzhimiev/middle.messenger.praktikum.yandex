import {
  UpdateUserInfoBody,
  UpdateUserPasswordBody,
} from "../api/user/user-api.model";
import { AuthController } from "./auth.controller";
import UserApiService from "../api/user/user-api.service";
import { settFormErr } from "../utils/validation";
import { Router } from "../utils/router";

const userService = new UserApiService();
const authController = new AuthController();
const router = new Router("#app");

export class UserController {
  private static __instance: UserController;

  constructor() {
    if (UserController.__instance) {
      return UserController.__instance;
    }
    UserController.__instance = this;
  }

  async updateUserInfo(data: UpdateUserInfoBody) {
    try {
      await userService.updateUserInfo(data);
      await authController.getUser();
      router.go("/profile");
    } catch (e) {
      settFormErr(e);
    }
  }

  async updateUserAvatar(data: FormData) {
    try {
      await userService.updateUserAvatar(data);
      await authController.getUser();
    } catch (e) {
      settFormErr(e);
    }
  }

  async updateUserPassword(data: UpdateUserPasswordBody) {
    try {
      await userService.updateUserPassword(data);
      router.go("/profile");
    } catch (e) {
      settFormErr(e);
    }
  }
}
