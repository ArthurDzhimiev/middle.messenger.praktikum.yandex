import { Router } from "../utils/router";
import { LogOutAPI } from "../api/log-out.api";

const logOutApi = new LogOutAPI();
const router = new Router("#app");

export class UserLogOutController {
  public logOut() {
    logOutApi.create().then(() => {
      router.go("/");
    });
  }
}
