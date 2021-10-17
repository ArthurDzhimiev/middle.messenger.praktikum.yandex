import "../profile.scss";
import Block from "../../../utils/block/block";
import compile from "../../../utils/block/compile";
import template from "./profile-info.hbs";
import { LinkButton } from "../../../components/link-button/link-button";
import { Router } from "../../../utils/router/router";
import { store } from "../../../store/index";
import { AuthController } from "../../../controllers/auth.controller";
import { UserController } from "../../../controllers/user.controller";

const authController = new AuthController();
const userController = new UserController();

export class ProfileInfoPage extends Block {
  router = new Router("#app");
  userInfo: any | null = null;

  constructor() {
    super("div");
  }

  componentDidMount() {
    this.userInfo = store.getState().user.profile;
    store.on("changed", () => {
      this.userInfo = store.getState().user.profile;
      this.setProps({
        ...this.props,
        userInfo: this.userInfo,
      });
    });
  }

  loadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files) {
      const formData = new FormData();
      formData.append("avatar", target.files[0]);
      userController.updateUserAvatar(formData);
    }
  }

  render(): DocumentFragment {
    setTimeout(() => {
      const avatarInput = document.getElementById("avatar");
      avatarInput?.addEventListener("change", this.loadFile);
    }, 100);
    const profileAvatarBtn = `
    <label class="profile__avatar-btn"
        style="background-image: url('${this.userInfo?.avatar ? 'https://ya-praktikum.tech/api/v2/resources' + this.userInfo?.avatar : ""}')"
        for="avatar">
    </label>`;
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
    const getBackBtn = new LinkButton({
      text: "Go back",
      events: {
        click: () => {
          this.router.go("/messenger");
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
          authController.logOut();
        },
      },
    });
    return compile(template, {
      userInfo: this.userInfo,
      updateInfoBtn,
      updatePassBtn,
      notFoundErrBtn,
      serverErrBtn,
      logOutBtn,
      getBackBtn,
      profileAvatarBtn
    });
  }
}
