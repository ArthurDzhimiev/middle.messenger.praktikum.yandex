import "../errors.scss";
import Block from "../../../utils/block";
import compile from "../../../utils/compile";
import template from './505.hbs'
import {Button} from "../../../components/button/button";
import {ChatPage} from "../../chat/chat";
import { render } from "../../../utils/renderTemplates";
export class ServerErrorPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const backBtn = new Button({
      text: "Open home page",
      events: {
        click: () => {
          render("#app", new ChatPage());
        },
      },
    });
    return compile(template, {
      backBtn
    });
  }
}

