import "./signin.scss";
import template from "./signin.hbs";
import Block from "../../utils/block";
import { Button } from "../../components/button/button";
import compile from "../../utils/compile";
import { LinkButton } from "../../components/link-button/link-button";
import { Input } from "../../components/input/input";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../utils/validation";
import { Router } from "../../utils/router";
import {UserSignInController} from "../../controllers/sign-in.controller";

const userSignInController = new UserSignInController()
export class SignInPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  signIn() {
    const isValidForm: boolean = validateForm("#SignIn");
    if (isValidForm) {
      userSignInController.signIn(
        collectFormData("#SignIn")
      )
    }
  }

  render(): DocumentFragment {
    const signInBtn = new Button({
      text: "Sign in",
      type: "submit",
      events: {
        click: () => {
          this.signIn();
        },
      },
    });
    const signUpBtn = new LinkButton({
      text: "Sign up",
      events: {
        click: () => {
          this.router.go("/sign-up");
        },
      },
    });
    return compile(template, {
      signInBtn,
      signUpBtn,
      login: new Input(InputsProps.login),
      password: new Input({
        ...InputsProps.password,
        errorText: "Invalid password",
      }),
    });
  }
}
