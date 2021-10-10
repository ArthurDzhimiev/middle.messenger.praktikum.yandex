export interface User {
  id: string;
  avatar: string;
  display_name: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UpdateUserInfoBody {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface UpdateUserAvatarBody {
  avatar: string;
}

export interface SearchUserBody {
  login: string;
}
export interface UpdateUserPasswordBody {
  oldPassword: string;
  newPassword: string;
}
