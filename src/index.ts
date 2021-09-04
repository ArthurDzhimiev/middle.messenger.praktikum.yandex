import {renderTemplate} from './utils/renderTemplates';
import './components/button';
import './components/input';
import './pages/signin';
import './pages/signup';
import './pages/profile/profile-info';
import './pages/profile/profile-update-info';
import './pages/profile/profile-update-password';
import './pages/errors/404';
import './pages/errors/505';
import './pages/chat/chat';

document.addEventListener('DOMContentLoaded', () => {
  renderTemplate('chat')
  document.addEventListener('click', (event: any) => {
    if (event.target.id.includes('Open')) {
      renderTemplate(event.target.id.replace('Open', ''))
    }
  })
})
