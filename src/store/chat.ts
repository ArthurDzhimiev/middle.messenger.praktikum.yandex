import {Action} from "../utils/store/store";
import {Chat} from "../api/chats/chats-api.model";
import {User} from "../api/user/user-api.model";

const SET_CHAT = 'chat/SET';
const DELETE_CHAT = 'chat/DELETE';
const SET_CHAT_ERROR = 'chat/SET_CHAT_ERROR';

const SET_CHAT_USERS = 'chat_users/SET';
const DELETE_CHAT_USERS = 'chat_users/DELETE';

export const setChat = (chat: Chat) => ({
  type: SET_CHAT,
  payload: chat,
});

export const deleteChat = () => ({
  type: DELETE_CHAT,
});
export const setChatUsers = (users: User[]) => ({
  type: SET_CHAT_USERS,
  payload: users,
});

export const deleteChatUsers = () => ({
  type: DELETE_CHAT_USERS,
});

export const setError = (error: { reason: string }) => ({
  type: SET_CHAT_ERROR,
  payload: error,
});

export default (state = { chat: null, error: null }, action: Action) => {
  switch (action.type) {
    case SET_CHAT:
      return { error: null, chat: action.payload };
    case DELETE_CHAT:
      return { chat: null, error: null };
    case SET_CHAT_USERS:
      return { error: null, users: action.payload };
    case DELETE_CHAT_USERS:
      return { users: null, error: null };
    case SET_CHAT_ERROR:
      return { error: action.payload, chat: null };
    default:
      return state;
  }
}
