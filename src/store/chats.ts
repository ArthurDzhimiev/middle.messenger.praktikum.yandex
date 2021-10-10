import {Action} from "../utils/store";
import {Chat} from "../api/chats/chats-api.model";

const SET_CHATS = 'chats/SET';
const DELETE_CHATS = 'chats/DELETE';
const SET_ERROR = 'chats/SET_ERROR';

export const setChats = (chats: Chat[]) => ({
  type: SET_CHATS,
  payload: chats,
});

export const deleteChats = () => ({
  type: DELETE_CHATS,
});

export const setError = (error: { reason: string }) => ({
  type: SET_ERROR,
  payload: error,
});

export default (state = { chats: null, error: null }, action: Action) => {
  switch (action.type) {
    case SET_CHATS:
      return { error: null, chats: action.payload };
    case DELETE_CHATS:
      return { chats: null, error: null };
    case SET_ERROR:
      return { error: action.payload, chats: null };
    default:
      return state;
  }
}
