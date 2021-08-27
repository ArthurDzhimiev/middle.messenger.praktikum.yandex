import signInTemplate from '../pages/signin/signin.hbs';
import signUpTemplate from '../pages/signup/signup.hbs';
import profileInfoTemplate from '../pages/profile/profile-info/profile-info.hbs';
import profileUpdateInfoTemplate from '../pages/profile/profile-update-info/profile-update-info.hbs';
import profileUpdatePasswordTemplate from '../pages/profile/profile-update-password/profile-update-password.hbs';
import notFoundTemplate from '../pages/errors/404/404.hbs';
import serverErrorTemplate from '../pages/errors/505/505.hbs';
import chatTemplate from '../pages/chat/chat.hbs';

const TEMPLATES = {
  signIn: signInTemplate,
  signUp: signUpTemplate,
  profileInfo: profileInfoTemplate,
  profileUpdateInfo: profileUpdateInfoTemplate,
  profileUpdatePassword: profileUpdatePasswordTemplate,
  notFound:  notFoundTemplate,
  serverError:  serverErrorTemplate,
  chat:  chatTemplate,
};

export function renderTemplate(name, locals = {}, parent = document.body) {
  const template = TEMPLATES[name];
  document.body.innerHTML = template(locals)
}
