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
import { ProfileInfoPage } from "../profile-info/profile-info";
import { render } from "../../../utils/renderTemplates";

export class ProfileUpdateInfoPage extends Block {
  constructor() {
    super("div");
  }

  updateInfo() {
    const isValidForm: boolean = validateForm("#UserInfo");
    if (isValidForm) {
      console.log(collectFormData("#UserInfo"));
      render("#app", new ProfileInfoPage());
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
          render("#app", new ProfileInfoPage());
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
