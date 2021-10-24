import "../profile.scss";
import Block from "../../../utils/block/block";
import compile from "../../../utils/block/compile";
import template from "./profile-update-password.hbs";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../../utils/validation/validation";
import { Input } from "../../../components/input/input";
import { Button } from "../../../components/button/button";
import { LinkButton } from "../../../components/link-button/link-button";
import {Router} from "../../../utils/router/router";
import {UserController} from "../../../controllers/user.controller";
const userController = new UserController();

export class ProfileUpdatePasswordPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  updatePassword() {
    const isValidForm: boolean = validateForm("#UpdatePassword");
    if (isValidForm) {
      userController.updateUserPassword(collectFormData("#UpdatePassword"));
    }
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
        errorText: 'Old password is required',
        validation: 'required',
        name: "oldPassword",
      }),
      newPassword: new Input({
        ...InputsProps.password,
        placeholder: "New password",
        name: "newPassword",
      }),
    });
  }
}
