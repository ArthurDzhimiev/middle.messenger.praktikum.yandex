import user from './user';
import chats from './chats';
import chat from './chat';
import {Store} from '../utils/store/store';


export const store = new Store({
  user,
  chats,
  chat
});
