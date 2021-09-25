import "./signin.scss";
import template from "./signin.hbs";
import Block from "../../utils/block";
import { Button } from "../../components/button/button";
import compile from "../../utils/compile";
import { LinkButton } from "../../components/link-button/link-button";
import { render } from "../../utils/renderTemplates";
import { SignUpPage } from "../signup/signup";
import { Input } from "../../components/input/input";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../utils/validation";
import { ChatPage } from "../chat/chat";

export class SignInPage extends Block {
  constructor() {
    super("div");
  }

  signIn() {
    const isValidForm: boolean = validateForm("#SignIn");
    if (isValidForm) {
      console.log(collectFormData("#SignIn"));
      render("#app", new ChatPage());
      return true;
    }
    throw new Error("Form is invalid");
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
          render("#app", new SignUpPage());
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
