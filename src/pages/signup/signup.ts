import "./signup.scss";
import template from "./signup.hbs";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import { Button } from "../../components/button/button";
import { render } from "../../utils/renderTemplates";
import { SignInPage } from "../signin/signin";
import { Input } from "../../components/input/input";
import { LinkButton } from "../../components/link-button/link-button";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../utils/validation";

export class SignUpPage extends Block {
  constructor() {
    super("div");
  }

  signUp() {
    const isValidForm: boolean = validateForm("#SignUp");
    if (isValidForm) {
      console.log(collectFormData("#SignUp"));
      render("#app", new SignInPage());
      return true;
    }
    throw new Error("Form is invalid");
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
          render("#app", new SignInPage());
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
