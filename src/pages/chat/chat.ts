import "./chat.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import template from "./chat.hbs";
import { LinkButton } from "../../components/link-button/link-button";
import { render } from "../../utils/renderTemplates";
import { ProfileInfoPage } from "../profile/profile-info/profile-info";
import { ChatCard } from "../../components/chat-card/chat-card";
import { Input } from "../../components/input/input";
import { InputsProps } from "../../utils/validation";

export class ChatPage extends Block {
  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const profileLink = new LinkButton({
      text: "Profile",
      events: {
        click: () => {
          render("#app", new ProfileInfoPage());
        },
      },
    });
    const chatCard = new ChatCard({
      status: "online",
      userName: "Artur dzhimiev",
      message: "How is it going?",
      time: "13:00",
      size: "m",
    });
    const chatHeaderCard = new ChatCard({
      status: "online",
      userName: "Artur dzhimiev",
      message: "How is it going?",
      time: "13:00",
      size: "s",
    });
    const inputSearch = new Input({
      ...InputsProps.search,
      events: {
        blur: () => {
          console.log("blur");
        },
      },
    });
    const inputMessage = new Input(InputsProps.message);

    return compile(template, {
      profileLink,
      chatCard,
      chatHeaderCard,
      inputSearch,
      inputMessage,
    });
  }
}
