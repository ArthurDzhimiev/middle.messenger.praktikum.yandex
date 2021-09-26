import { SignInModel } from "../models/sign-in.model";
import { SignInAPI } from "../api/sign-in.api";
import { Router } from "../utils/router";

const signInApi = new SignInAPI();
const router = new Router("#app");

export class UserSignInController {
  public signIn(data: SignInModel) {
    signInApi
      .create(data)
      .then(() => {
        this.getUser();
      })
      .catch((err) => {
        const errEl = document.querySelector("#FormErr");
        if (errEl) {
          errEl.innerHTML = err.statusText.reason;
        }
      });
  }

  public getUser() {
    signInApi
      .request()
      .then((res) => {
        console.log(res, "Set user to store");
        if (router._currentRoute) {
          const currentPath = router._currentRoute._pathname;
          if (currentPath === "/" || currentPath === "signUp") {
            router.go("/messenger");
          }
        }
      })
      .catch(() => {
        router.go("/");
      });
  }
}
