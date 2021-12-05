import { HTTPTransport } from "../../utils/api/fetch";
import { ChatUpdateUsersBody, CreateChatBody } from "./chats-api.model";

const http = new HTTPTransport();

export default class ChatsApiService {
  private static __instance: ChatsApiService;

  constructor() {
    if (ChatsApiService.__instance) {
      return ChatsApiService.__instance;
    }
    ChatsApiService.__instance = this;
  }

  createChat(data: CreateChatBody): Promise<XMLHttpRequest> {
    return http.post("chats", { data });
  }

  deleteChat(chatId: number): Promise<XMLHttpRequest> {
    return http.delete("chats", { data: { chatId } });
  }

  getChats(): Promise<XMLHttpRequest> {
    return http.get("chats");
  }

  getChatUsers(id: number): Promise<XMLHttpRequest> {
    return http.get(`chats/${id}/users`);
  }

  getChatToken(id: number): Promise<XMLHttpRequest> {
    return http.post(`chats/token/${id}`, { data: { id } });
  }

  addUsersToChat(data: ChatUpdateUsersBody): Promise<XMLHttpRequest> {
    return http.put("chats/users", { data });
  }
  deleteUsersFromChat(data: ChatUpdateUsersBody): Promise<XMLHttpRequest> {
    return http.delete("chats/users", { data });
  }
}
