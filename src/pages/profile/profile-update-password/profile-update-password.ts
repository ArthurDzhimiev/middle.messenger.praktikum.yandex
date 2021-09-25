import "../profile.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from "./profile-update-password.hbs";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../../utils/validation";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { LinkButton } from "../../../components/link-button/link-button";
import {Router} from "../../../utils/router";

export class ProfileUpdatePasswordPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  updatePassword() {
    const isValidForm: boolean = validateForm("#UpdatePassword");
    if (isValidForm) {
      console.log(collectFormData("#UpdatePassword"));
      this.router.go("/profile");
      return true;
    }
    throw new Error("Form is invalid");
  }

  render(): DocumentFragment {
    const saveBtn = new Button({
      text: "Update password",
      type: "submit",
      events: {
        click: () => this.updatePassword(),
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
      saveBtn,
      cancelBtn,
      oldPassword: new Input({
        ...InputsProps.password,
        placeholder: "Old password",
        name: "old_password",
      }),
      newPassword: new Input({
        ...InputsProps.password,
        placeholder: "New password",
        name: "new_password",
      }),
    });
  }
}
