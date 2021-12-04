import { HTTPTransport } from "../../utils/api/fetch";
import {SearchUserBody, UpdateUserInfoBody, UpdateUserPasswordBody} from "./user-api.model";

const http = new HTTPTransport();

export default class UserApiService {
  private static __instance: UserApiService;

  constructor() {
    if (UserApiService.__instance) {
      return UserApiService.__instance;
    }
    UserApiService.__instance = this;
  }

  updateUserInfo(data: UpdateUserInfoBody): Promise<XMLHttpRequest> {
    return http.put("user/profile", { data });
  }

  updateUserAvatar(data: FormData): Promise<XMLHttpRequest> {
    return http.put("user/profile/avatar", { data });
  }

  updateUserPassword(data: UpdateUserPasswordBody): Promise<XMLHttpRequest> {
    return http.put("user/password/", { data });
  }
  searchUser(data: SearchUserBody): Promise<XMLHttpRequest> {
    return http.post("user/search/", { data });
  }
}
