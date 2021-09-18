import "../profile.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from "./profile-info.hbs";
import { LinkButton } from "../../../components/link-button/link-button";
import { render } from "../../../utils/renderTemplates";
import { ProfileUpdatePasswordPage } from "../profile-update-password/profile-update-password";
import { ProfileUpdateInfoPage } from "../profile-update-info/profile-update-info";
import { NotFoundPage } from "../../errors/404/404";
import { ServerErrorPage } from "../../errors/505/505";
import { SignInPage } from "../../signin/signin";

export class ProfileInfoPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const updateInfoBtn = new LinkButton({
      text: "Update user info",
      events: {
        click: () => {
          render("#app", new ProfileUpdateInfoPage());
        },
      },
    });
    const updatePassBtn = new LinkButton({
      text: "Update password",
      events: {
        click: () => {
          render("#app", new ProfileUpdatePasswordPage());
        },
      },
    });
    const notFoundErrBtn = new LinkButton({
      text: "Open 404 page",
      color: "red",
      events: {
        click: () => {
          render("#app", new NotFoundPage());
        },
      },
    });
    const serverErrBtn = new LinkButton({
      text: "Open 500 page",
      color: "red",
      events: {
        click: () => {
          render("#app", new ServerErrorPage());
        },
      },
    });
    const logOutBtn = new LinkButton({
      text: "Log out",
      color: "red",
      events: {
        click: () => {
          render("#app", new SignInPage());
        },
      },
    });
    return compile(template, {
      updateInfoBtn,
      updatePassBtn,
      notFoundErrBtn,
      serverErrBtn,
      logOutBtn,
    });
  }
}
