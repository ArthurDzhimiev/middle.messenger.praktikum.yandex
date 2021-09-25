import "./chat.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import template from "./chat.hbs";
import { LinkButton } from "../../components/link-button/link-button";
import { ChatCard } from "../../components/chat-card/chat-card";
import { Input } from "../../components/input/input";
import { InputsProps } from "../../utils/validation";
import { ChatMessage } from "../../components/chat-message/chat-message";
import {Router} from "../../utils/router";

const messages = [
  {
    ownMessage: true,
    text: "But don’t worry cause we are all learning here But don’t worry cause we are all learning here But don’t worry cause we are all learning here",
    time: "16:46",
  },
  {
    ownMessage: false,
    text: "But don’t worry cause we are all learning here",
    time: "16:46",
  },
  {
    ownMessage: true,
    text: "But don’t worry cause we are all learning here",
    time: "16:46",
  },
  {
    ownMessage: false,
    text: "But don’t worry cause we are all learning here",
    time: "16:46",
  },
];

export class ChatPage extends Block {
  router = new Router("#app");

  constructor() {
    super("div");
  }

  render(): DocumentFragment {
    const profileLink = new LinkButton({
      text: "Profile",
      events: {
        click: () => {
          this.router.go("/profile");
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
    const chatMessages = messages.map((message) => {
      return new ChatMessage({
        text: message.text,
        time: message.time,
        type: message.ownMessage ? "blue" : "white",
      })._element.innerHTML;
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
      chatMessages,
    });
  }
}
