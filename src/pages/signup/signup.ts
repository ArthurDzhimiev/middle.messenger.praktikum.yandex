import "./signup.scss";
import template from "./signup.hbs";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import { Button } from "../../components/button/button";
import { render } from "../../utils/renderTemplates";
import { SignInPage } from "../signin/signin";
import { Input } from "../../components/input/input";
import { LinkButton } from "../../components/link-button/link-button";
import { InputsProps } from "../../utils/forms";

export class SignUpPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const signUpBtn = new Button({
      text: "Sign up",
      events: {
        click: () => {
          render("#app", new SignInPage());
        },
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
      firstName: new Input(InputsProps.firstName, "signUp__input"),
      secondName: new Input(InputsProps.secondName, "signUp__input"),
      login: new Input(InputsProps.login, "signUp__input"),
      email: new Input(InputsProps.email, "signUp__input"),
      phone: new Input(InputsProps.phone, "signUp__input"),
      password: new Input(InputsProps.password, "signUp__input"),
    });
  }
}
