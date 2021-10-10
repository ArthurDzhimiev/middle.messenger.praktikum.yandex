import "./chat.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";
import template from "./chat.hbs";
import { Input } from "../../components/input/input";
import { collectCheckList, InputsProps } from "../../utils/validation";
import { Router } from "../../utils/router";
import { store } from "../../store/index";
import { Chat } from "../../api/chats/chats-api.model";
import { ChatsController } from "../../controllers/chats.controller";
import { LinkButton } from "../../components/link-button/link-button";
import { UserController } from "../../controllers/user.controller";
import { Checkbox } from "../../components/checkbox/checkbox";
import { User } from "../../api/user/user-api.model";
import { Button } from "../../components/button/button";

const chatsController = new ChatsController();
const userController = new UserController();

export class ChatPage extends Block {
  router = new Router("#app");
  chat: Chat;

  constructor() {
    super("div");
  }

  async searchUser(login: string) {
    const users: any = await userController.searchUser({ login });
    const usersListWrapper = document.getElementById("UsersCheckList");
    if (usersListWrapper) {
      usersListWrapper.innerHTML = "";
      this.getUsersCheckList(users).forEach((user) => {
        usersListWrapper.appendChild(user.getContent());
      });
    }
  }

  async addUsers() {
    const users = collectCheckList("#UsersCheckList");
    await chatsController.addUsersToChat({
      chatId: this.chat.id,
      users,
    });
    await chatsController.getChatUsers(this.chat.id);
    this.closeModal('userModal');
  }

  getUsersCheckList(users: User[]) {
    if (users) {
      return users.map((user) => {
        return new Checkbox({
          name: "user",
          text: user.login,
          id: user.id,
          value: user.id
        });
      });
    }
    return [];
  }

  sendMessage(message: string) {
    chatsController.sendMessage(message);
  }

  openModal(modalId: string) {
    const modal = document.getElementById(modalId)
    modal?.classList.add('modal--open')
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId)
    modal?.classList.remove('modal--open')
  }

  componentDidMount() {
    store.on("changed", () => {
      const chat = store.getState().chat.chat;
      if (chat && this.chat?.id !== chat?.id) {
        this.chat = chat;
        this.setProps({
          ...this.props,
          chat: this.chat,
        });
      }
    });
  }

  render(): DocumentFragment {
    const inputMessage = new Input({
      ...InputsProps.message,
      events: {
        keyup: (event) => {
          if (event.keyCode === 13 && event.target.value) {
            this.sendMessage(event.target.value);
            event.target.value = "";
          }
        },
      },
    });
    const usersModalBtn = new LinkButton({
      text: "Add user",
      events: {
        click: () => this.openModal('userModal'),
      },
    });
    const closeChatModalBtn = new LinkButton({
      text: "Close",
      events: {
        click: () => this.closeModal('userModal'),
      },
    });
    const userSearchInput = new Input({
      ...InputsProps.chatTitle,
      events: {
        keyup: (event) => {
          this.searchUser(event.target.value);
        },
      },
    });
    const addUsersBtn = new Button({
      text: "Add users",
      type: "submit",
      events: {
        click: () => this.addUsers(),
      },
    });

    return compile(template, {
      inputMessage: this.props.chat ? inputMessage : null,
      chatStatus: !this.props.chat ? "closed" : "open",
      chat: this.props.chat,

      closeChatModalBtn: closeChatModalBtn,
      usersCheckList: this.props.usersCheckList,
      usersModalBtn,
      addUsersBtn,
      userSearchInput,
    });
  }
}
