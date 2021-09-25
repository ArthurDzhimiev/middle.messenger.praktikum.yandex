import "../profile.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from "./profile-update-info.hbs";
import { Input } from "../../../components/input/input";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../../utils/validation";
import { Button } from "../../../components/button/button";
import { LinkButton } from "../../../components/link-button/link-button";
import { Router } from "../../../utils/router";

export class ProfileUpdateInfoPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  updateInfo() {
    const isValidForm: boolean = validateForm("#UserInfo");
    if (isValidForm) {
      console.log(collectFormData("#UserInfo"));
      this.router.go("/profile");

      return true;
    }
    throw new Error("Form is invalid");
  }

  render(): DocumentFragment {
    const updateInfoBtn = new Button({
      text: "Update profile",
      type: "submit",
      events: {
        click: () => this.updateInfo(),
      },
    });
    const cancelBtn = new LinkButton({
      text: "Cancel",
      events: {
        click: () => {
          this.router.go("/profile");
        },
      },
    });
    return compile(template, {
      cancelBtn,
      updateInfoBtn,
      firstName: new Input(InputsProps.firstName),
      secondName: new Input(InputsProps.secondName),
      displayName: new Input(InputsProps.displayName),
      login: new Input(InputsProps.login),
      email: new Input(InputsProps.email),
      phone: new Input(InputsProps.phone),
    });
  }
}
