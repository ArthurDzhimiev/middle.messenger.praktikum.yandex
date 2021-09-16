import { render } from "./utils/renderTemplates";
import {ChatPage} from "./pages/chat/chat";

document.addEventListener("DOMContentLoaded", () => {
  render("#app", new ChatPage());
});
