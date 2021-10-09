import { HTTPTransport } from "../../utils/fetch";
import { UpdateUserInfoBody, UpdateUserPasswordBody } from "./user-api.model";

const APIInstance = new HTTPTransport();

export default class UserApiService {
  private static __instance: UserApiService;

  constructor() {
    if (UserApiService.__instance) {
      return UserApiService.__instance;
    }
    UserApiService.__instance = this;
  }

  updateUserInfo(data: UpdateUserInfoBody): Promise<XMLHttpRequest> {
    return APIInstance.put("user/profile", { data });
  }

  updateUserAvatar(data: FormData): Promise<XMLHttpRequest> {
    return APIInstance.put("user/profile/avatar", { data });
  }

  updateUserPassword(data: UpdateUserPasswordBody): Promise<XMLHttpRequest> {
    return APIInstance.put("user/password/", { data });
  }
}
