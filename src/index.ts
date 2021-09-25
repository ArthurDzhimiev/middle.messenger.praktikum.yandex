import { render } from "./utils/renderTemplates";
import { SignInPage } from "./pages/signin/signin";

document.addEventListener("DOMContentLoaded", () => {
  render("#app", new SignInPage());
});
