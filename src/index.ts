import { render } from "./utils/renderTemplates";
import { ProfileInfoPage } from "./pages/profile/profile-info/profile-info";

document.addEventListener("DOMContentLoaded", () => {
  render("#app", new ProfileInfoPage());
});
