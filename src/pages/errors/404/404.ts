import "../errors.scss";
import Block from "../../../utils/block/block";
import compile from "../../../utils/block/compile";
import template from "./404.hbs";
import { Button } from "../../../components/button/button";
import {Router} from "../../../utils/router/router";

export class NotFoundPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const backBtn = new Button({
      text: "Open home page",
      type: "button",
      events: {
        click: () => {
          this.router.go("/messenger");
        },
      },
    });
    return compile(template, {
      backBtn,
    });
  }
}
