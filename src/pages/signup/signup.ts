import "./signup.scss";
import template from "./signup.hbs";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { LinkButton } from "../../components/link-button/link-button";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../utils/validation";
import { Router } from "../../utils/router";
import {AuthController} from "../../controllers/auth.controller";

const authController = new AuthController();

export class SignUpPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  signUp() {
    const isValidForm: boolean = validateForm("#SignUp");
    if (isValidForm) {
      authController.signUp(collectFormData("#SignUp"));
    }
  }

  render(): DocumentFragment {
    const signUpBtn = new Button({
      text: "Sign up",
      type: "submit",
      events: {
        click: () => this.signUp(),
      },
    });
    const signInBtn = new LinkButton({
      text: "Sign in",
      events: {
        click: () => {
          this.router.go("/");
        },
      },
    });
    return compile(template, {
      signInBtn,
      signUpBtn,
      firstName: new Input(InputsProps.firstName),
      secondName: new Input(InputsProps.secondName),
      login: new Input(InputsProps.login),
      email: new Input(InputsProps.email),
      phone: new Input(InputsProps.phone),
      password: new Input(InputsProps.password),
    });
  }
}
