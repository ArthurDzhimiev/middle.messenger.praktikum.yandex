import "../profile.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from "./profile-update-password.hbs";

export class ProfileUpdatePasswordPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    return compile(template, {});
  }
}
