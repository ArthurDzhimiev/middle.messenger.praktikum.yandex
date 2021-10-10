import { HTTPTransport } from "../../utils/fetch";
import {
  AddUsersBody,
  CreateChatBody,
  DeleteChatBody,
} from "./chats-api.model";

const APIInstance = new HTTPTransport();

export default class ChatsApiService {
  private static __instance: ChatsApiService;

  constructor() {
    if (ChatsApiService.__instance) {
      return ChatsApiService.__instance;
    }
    ChatsApiService.__instance = this;
  }

  createChat(data: CreateChatBody): Promise<XMLHttpRequest> {
    return APIInstance.post("chats", { data });
  }

  deleteChat(data: DeleteChatBody): Promise<XMLHttpRequest> {
    return APIInstance.post("chats", { data });
  }

  getChats(): Promise<XMLHttpRequest> {
    return APIInstance.get("chats");
  }

  getChatUsers(id: number): Promise<XMLHttpRequest> {
    return APIInstance.get(`chats/${id}/users`);
  }

  getChatToken(id: number): Promise<XMLHttpRequest> {
    return APIInstance.post(`chats/token/${id}`, { data: { id } });
  }

  addUsersToChat(data: AddUsersBody): Promise<XMLHttpRequest> {
    return APIInstance.put("chats/users", { data });
  }
}
