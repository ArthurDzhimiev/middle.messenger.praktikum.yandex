import "../profile.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from "./profile-update-info.hbs";

export class ProfileUpdateInfoPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    return compile(template, {});
  }
}
