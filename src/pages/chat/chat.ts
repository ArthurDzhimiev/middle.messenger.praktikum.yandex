import "./chat.scss";
import Block from "../../utils/block/block";
import compile from "../../utils/block/compile";
import template from "./chat.hbs";
import { Input } from "../../components/input/input";
import {
  collectCheckList,
  InputsProps,
} from "../../utils/validation/validation";
import { Router } from "../../utils/router/router";
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

  async addUsers() {
    const users = collectCheckList("#UsersCheckList");
    await chatsController.addUsersToChat({
      chatId: this.chat.id,
      users,
    });
    await chatsController.getChatUsers(this.chat.id);
    this.closeModal("userModal");
    const usersListWrapper = document.getElementById("UsersCheckList");
    if (usersListWrapper) {
      usersListWrapper.innerHTML = "";
    }
  }

  async deleteUsers() {
    const users = collectCheckList("#UsersEditCheckList", false);
    await chatsController.deleteUsersFromChat({
      chatId: this.chat.id,
      users,
    });
    this.closeModal("usersEditModal");
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

  getUsersCheckList(users: User[], checked?: string) {
    if (users) {
      return users.map((user) => {
        return new Checkbox({
          name: "user",
          text: user.login,
          id: user.id,
          value: user.id,
          checked,
        });
      });
    }
    return [];
  }

  openUsersEditModal() {
    const users = store.getState().chat.users;
    this.openModal("usersEditModal");
    const usersListWrapper = document.getElementById("UsersEditCheckList");
    if (usersListWrapper) {
      usersListWrapper.innerHTML = "";
      this.getUsersCheckList(users, "checked").forEach((user) => {
        usersListWrapper.appendChild(user.getContent());
      });
    }
  }

  async deleteChat() {
    await chatsController.deleteChat(this.chat.id);
    await chatsController.getChats();
    this.setProps({
      ...this.props,
      chat: null,
    });
  }

  sendMessage(message: string) {
    chatsController.sendMessage(message);
  }

  openModal(modalId: string) {
    const modal = document.getElementById(modalId);
    modal?.classList.add("modal--open");
  }

  closeModal(modalId: string) {
    const modal = document.getElementById(modalId);
    modal?.classList.remove("modal--open");
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
        click: () => this.openModal("userModal"),
      },
    });
    const editUsersModalBtn = new LinkButton({
      text: "Edit users",
      events: {
        click: () => this.openUsersEditModal(),
      },
    });
    const deleteChatBtn = new LinkButton({
      text: "Delete chat",
      events: {
        click: () => this.deleteChat(),
      },
    });
    const closeChatModalBtn = new LinkButton({
      text: "Close",
      events: {
        click: () => this.closeModal("userModal"),
      },
    });
    const closeChatEditModalBtn = new LinkButton({
      text: "Close",
      events: {
        click: () => this.closeModal("usersEditModal"),
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
    const editUsersBtn = new Button({
      text: "Edit users",
      type: "submit",
      events: {
        click: () => this.deleteUsers(),
      },
    });

    return compile(template, {
      inputMessage: this.props.chat ? inputMessage : null,
      chatStatus: !this.props.chat ? "closed" : "open",
      chat: this.props.chat,
      closeChatModalBtn: closeChatModalBtn,
      usersCheckList: this.props.usersCheckList,
      usersModalBtn,
      editUsersModalBtn,
      deleteChatBtn,
      addUsersBtn,
      editUsersBtn,
      userSearchInput,
      closeChatEditModalBtn,
    });
  }
}
