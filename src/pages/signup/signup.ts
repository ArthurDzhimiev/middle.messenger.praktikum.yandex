import "./signup.scss";
import template from "./signup.hbs";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import { Button } from "../../components/button/button";
import { render } from "../../utils/renderTemplates";
import { SignInPage } from "../signin/signin";

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
    return compile(template, {
      signUpBtn,
    });
  }

  // <form class="signUp__form" action="">
  //   <div class="signUp__input">
  //     {{> input placeholder="First name" type="text" name="first_name"}}
  // </div>
  // <div class="signUp__input">
  //   {{> input placeholder="Second name" type="text" name="second_name"}}
  // </div>
  // <div class="signUp__input">
  //   {{> input placeholder="Login" type="text" name="login"}}
  // </div>
  // <div class="signUp__input">
  //   {{> input placeholder="Email" type="text" name="email"}}
  // </div>
  // <div class="signUp__input">
  //   {{> input placeholder="Phone" type="text" name="phone"}}
  // </div>
  // <div class="signUp__input">
  //   {{> input placeholder="Password" type="password" name="password"}}
  // </div>
  // <div class="signUp__btn-wrapper">
  //   {{> button text="Sign up" type="button" id="chatOpen" }}
  // </div>
  // </form>
}
