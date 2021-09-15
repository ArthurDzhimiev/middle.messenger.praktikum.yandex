import "./signin.scss";
import template from "./signin.hbs";
import Block from "../../utils/block";
import { Button } from "../../components/button/button";
import compile from "../../utils/compile";
import { LinkButton } from "../../components/link-button/link-button";
import { render } from "../../utils/renderTemplates";
import { SignUpPage } from "../signup/signup";

export class SignInPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const signInBtn = new Button({
      text: "Sign in",
      events: {
        click: () => {
          console.log(1234);
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
    });
  }
}
