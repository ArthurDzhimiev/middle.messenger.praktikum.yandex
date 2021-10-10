import ChatsApiService from "../api/chats/chats-api.service";
import { store } from "../store/index";
import { deleteChats, setChats } from "../store/chats";
import { AddUsersBody, CreateChatBody } from "../api/chats/chats-api.model";
import { deleteChatUsers, setChat, setChatUsers } from "../store/chat";
import { ChatMessage } from "../components/chat-message/chat-message";

const chatsService = new ChatsApiService();

export class ChatsController {
  private static __instance: ChatsController;
  socket: WebSocket;

  constructor() {
    if (ChatsController.__instance) {
      return ChatsController.__instance;
    }
    ChatsController.__instance = this;
  }

  async getChats() {
    try {
      const chats: any = await chatsService.getChats();
      store.dispatch(setChats(JSON.parse(chats)));
      return JSON.parse(chats);
    } catch (e) {
      store.dispatch(deleteChats());
    }
  }

  async createChat(data: CreateChatBody) {
    try {
      const chat: any = await chatsService.createChat(data);
      const chats = await this.getChats();
      store.dispatch(setChat(chats[0]));
      return chat;
    } catch (e) {
      store.dispatch(deleteChats());
    }
  }

  async addUsersToChat(data: AddUsersBody) {
    try {
      await chatsService.addUsersToChat(data);
    } catch (e) {
      store.dispatch(deleteChats());
    }
  }

  async getChatUsers(id: number) {
    try {
      const users: any = await chatsService.getChatUsers(id);
      store.dispatch(setChatUsers(JSON.parse(users)));
      return JSON.parse(users);
    } catch (e) {
      store.dispatch(deleteChatUsers());
    }
  }

  async getChatToken(id: number) {
    try {
      const token: any = await chatsService.getChatToken(id);
      // store.dispatchtch(setChatUsers(JSON.parse(users)));
      return JSON.parse(token).token;
    } catch (e) {}
  }

  connectSocket(user: string, chat: number, token: string) {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${user}/${chat}/${token}`
    );
    this.socket.addEventListener("open", () => {
      this.socket.send(
        JSON.stringify({
          content: "0",
          type: "get old",
        })
      );
    });
    this.socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      this.setMessages(data);
    });
  }

  setMessages(data: any) {
    const isArray = Array.isArray(data);
    if (isArray || data.type === "message") {
      const messages = isArray ? data.reverse() : [data];
      const chatMessages = document.getElementById("ChatMessages");
      const userId = store.getState().user.profile.id;
      if (chatMessages) {
        messages.forEach((message) => {
          chatMessages?.appendChild(
            new ChatMessage({
              text: message.content,
              time: new Date(message.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
              type: userId === message.user_id ? "blue" : "white",
            }).getContent()
          );
        });
        chatMessages.scrollTo({
          top: chatMessages.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }

  sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: "message",
      })
    );
  }
}
