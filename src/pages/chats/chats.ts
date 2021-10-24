import "./chats.scss";
import Block from "../../utils/block/block";
import compile from "../../utils/block/compile";
import template from "./chats.hbs";
import { LinkButton } from "../../components/link-button/link-button";
import { ChatCard } from "../../components/chat-card/chat-card";
import { Input } from "../../components/input/input";
import {
  collectFormData,
  InputsProps,
  validateForm,
} from "../../utils/validation/validation";
import { Router } from "../../utils/router/router";
import { store } from "../../store/index";
import { Chat } from "../../api/chats/chats-api.model";
import { ChatsController } from "../../controllers/chats.controller";
import { Button } from "../../components/button/button";
import { ChatPage } from "../chat/chat";
import { setChat } from "../../store/chat";

const chatsController = new ChatsController();

export class ChatsPage extends Block {
  router = new Router("#app");
  chats: Chat[];

  constructor() {
    super("div");
  }

  getChatCards(chats: Chat[]) {
    if (chats) {
      return chats.map((chat) => {
        const time = chat?.last_message?.time
          ? new Date(chat?.last_message?.time).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "";
        return new ChatCard({
          status: "online",
          userName: chat?.title,
          message: chat?.last_message?.content,
          time,
          size: "m",
          events: {
            click: () => this.openChat(chat),
          },
        });
      });
    }
    return [];
  }

  async openChat(chat: Chat) {
    store.dispatch(setChat(chat));
    await chatsController.getChatUsers(chat.id);
    const token = await chatsController.getChatToken(chat.id);
    chatsController.connectSocket(
      store.getState().user.profile.id,
      chat.id,
      token
    );
  }

  componentDidMount() {
    chatsController.getChats();
    store.on("changed", () => {
      const chats = store.getState().chats.chats;
      if (chats && (!this.chats || this.chats.length !== chats.length)) {
        this.chats = chats;
        this.setProps({
          ...this.props,
          chats: this.getChatCards(this.chats),
        });
        this.render();
      }
    });
  }

  async createChat() {
    const isValidForm: boolean = validateForm("#CreateChatForm");
    if (isValidForm) {
      await chatsController.createChat(collectFormData("#CreateChatForm"));
      this.closeChatModal();
    }
  }

  openChatModal() {
    const chatModal = document.getElementById("chatModal");
    chatModal?.classList.add("modal--open");
  }

  closeChatModal() {
    const chatModal = document.getElementById("chatModal");
    chatModal?.classList.remove("modal--open");
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
    const addChatModalBtn = new Button({
      text: "Add new chat",
      type: "button",
      events: {
        click: () => this.openChatModal(),
      },
    });
    const addChatBtn = new Button({
      text: "Add new chat",
      type: "button",
      events: {
        click: () => this.createChat(),
      },
    });
    const closeChatBtn = new LinkButton({
      text: "Close",
      events: {
        click: () => this.closeChatModal(),
      },
    });

    const chatTitleInput = new Input({
      ...InputsProps.chatTitle,
    });

    return compile(template, {
      profileLink,
      chats: this.props.chats,
      addChatModalBtn,
      closeChatBtn,
      chatTitleInput,
      addChatBtn,
      chat: new ChatPage(),
    });
  }
}
