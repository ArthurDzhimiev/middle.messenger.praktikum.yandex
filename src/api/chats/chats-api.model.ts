export interface Chat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: ChatUser;
    time: string;
    content: string;
  };
}

export interface ChatUser {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  login: string;
  phone: string;
  second_name: string;
}

export interface CreateChatBody {
  title: string;
}

export interface DeleteChatBody {
  chatId: string;
}

export interface AddUsersBody {
  users: number[];
  chatId: number;
}
