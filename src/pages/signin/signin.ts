import "./signin.scss";
import template from "./signin.hbs";
import Block from "../../utils/block";
import { Button } from "../../components/button/button";
import compile from "../../utils/compile";
import { LinkButton } from "../../components/link-button/link-button";
import { render } from "../../utils/renderTemplates";
import { SignUpPage } from "../signup/signup";
import { Input } from "../../components/input/input";
import { InputsProps } from "../../utils/forms";
import {ChatPage} from "../chat/chat";

export class SignInPage extends Block {
  constructor() {
    super("div");
  }

  blur(inputType: string) {
    console.log(inputType);
  }

  render(): DocumentFragment {
    const signInBtn = new Button({
      text: "Sign in",
      events: {
        click: () => {
          render("#app", new ChatPage());
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
      loginInput: new Input(InputsProps.login, "signIn__input"),
      passwordInput: new Input(InputsProps.password, "signIn__input"),
    });
  }
}
