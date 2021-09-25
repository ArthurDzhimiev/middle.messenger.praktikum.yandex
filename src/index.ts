import {Router} from "./utils/router";
import {SignInPage} from "./pages/signin/signin";
import {SignUpPage} from "./pages/signup/signup";
import {ChatPage} from "./pages/chat/chat";
import {ProfileInfoPage} from "./pages/profile/profile-info/profile-info";
import {ProfileUpdateInfoPage} from "./pages/profile/profile-update-info/profile-update-info";
import {ProfileUpdatePasswordPage} from "./pages/profile/profile-update-password/profile-update-password";
import {NotFoundPage} from "./pages/errors/404/404";
import {ServerErrorPage} from "./pages/errors/505/505";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("#app");
  router
    .use("/", SignInPage)
    .use("/sign-up", SignUpPage)
    .use("/messenger", ChatPage)
    .use("/profile", ProfileInfoPage)
    .use("/settings", ProfileUpdateInfoPage)
    .use("/update-password", ProfileUpdatePasswordPage)
    .use("/404", NotFoundPage)
    .use("/500", ServerErrorPage)
    .start();
});
