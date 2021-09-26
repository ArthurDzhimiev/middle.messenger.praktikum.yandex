import "../profile.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from "./profile-info.hbs";
import { LinkButton } from "../../../components/link-button/link-button";
import {Router} from "../../../utils/router";
import {UserLogOutController} from "../../../controllers/log-out.controller";

const userLogOutController = new UserLogOutController()

export class ProfileInfoPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const updateInfoBtn = new LinkButton({
      text: "Update user info",
      events: {
        click: () => {
          this.router.go("/settings");
        },
      },
    });
    const updatePassBtn = new LinkButton({
      text: "Update password",
      events: {
        click: () => {
          this.router.go("/update-password");
        },
      },
    });
    const notFoundErrBtn = new LinkButton({
      text: "Open 404 page",
      color: "red",
      events: {
        click: () => {
          this.router.go("/404");
        },
      },
    });
    const serverErrBtn = new LinkButton({
      text: "Open 500 page",
      color: "red",
      events: {
        click: () => {
          this.router.go("/500");
        },
      },
    });
    const logOutBtn = new LinkButton({
      text: "Log out",
      color: "red",
      events: {
        click: () => {
          userLogOutController.logOut()
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
