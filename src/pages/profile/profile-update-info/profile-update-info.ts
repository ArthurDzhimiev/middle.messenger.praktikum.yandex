import "../profile.scss";
import Block from "../../../utils/block/block";
import compile from "../../../utils/block/compile";
import template from "./profile-update-info.hbs";
import { Input } from "../../../components/input/input";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../../utils/validation/validation";
import { Button } from "../../../components/button/button";
import { LinkButton } from "../../../components/link-button/link-button";
import { Router } from "../../../utils/router/router";
import { store } from "../../../store/index";
import { User } from "../../../api/user/user-api.model";
import {UserController} from "../../../controllers/user.controller";

const userController = new UserController();

export class ProfileUpdateInfoPage extends Block {
  router = new Router("#app");
  userInfo: User;

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

  updateInfo() {
    const isValidForm: boolean = validateForm("#UserInfo");
    if (isValidForm) {
      userController.updateUserInfo(collectFormData("#UserInfo"));
    }
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
      firstName: new Input({
        ...InputsProps.firstName,
        value: this.userInfo?.first_name,
      }),
      secondName: new Input({
        ...InputsProps.secondName,
        value: this.userInfo?.second_name,
      }),
      displayName: new Input({
        ...InputsProps.displayName,
        value: this.userInfo?.display_name,
      }),
      login: new Input({
        ...InputsProps.login,
        value: this.userInfo?.login,
      }),
      email: new Input({
        ...InputsProps.email,
        value: this.userInfo?.email,
      }),
      phone: new Input({
        ...InputsProps.phone,
        value: this.userInfo?.phone,
      }),
    });
  }
}
