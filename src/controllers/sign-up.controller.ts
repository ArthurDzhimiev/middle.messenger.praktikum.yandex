import { SignUpApi } from "../api/sign-up.api";
import { SignUpModel } from "../models/sign-up.model";
import {UserSignInController} from "./sign-in.controller";

const signUpApi = new SignUpApi();
const userSignInController = new UserSignInController();

export class UserSignUpController {
  public signUp(data: SignUpModel) {
    signUpApi
      .create(data)
      .then(() => {
        return userSignInController.getUser();
      })
      .then()
      .catch((err) => {
        const errEl = document.querySelector("#FormErr");
        if (errEl) {
          errEl.innerHTML = err.statusText.reason;
        }
      });
  }
}
