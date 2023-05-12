import { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import AuthView from './views/AuthView';
import HeroesBrowseView from './views/HeroesBrowseView';
import HeroMainView from './views/HeroMainView';
import HeroEditView from './views/HeroEditView';
import HeroViewLayout from './views/HeroViewLayout';
import HeroMatchupViewLayout from './views/HeroMatchupViewLayout';
import HeroMatchupView from './views/HeroMatchupView';
import HeroMatchupEditView from './views/HeroMatchupEditView';

import { getWhitelist } from './api/whitelist';
import { trackAnalytics } from './api/analytics';

import './App.css';

function App() {
  const [theme, setTheme] = useState(true);
  const [user, setUser] = useState(undefined);
  const navigate = useNavigate();
  async function onLoginSuccess(credentials) {
    const row = await getWhitelist({ email: credentials?.email });
    credentials['hasEditAccess'] = row ? true : false;
    trackAnalytics('LOG_IN', credentials?.email, credentials);
    setUser(credentials);
    navigate(-1);
  }
  function onLogoutSuccess() {
    trackAnalytics('LOG_OUT', user?.email, user);
    setUser(undefined);
    navigate(-1);
  }
  return (
    <div className={`app ${theme ? 'dark-mode' : 'light-mode'}`}>
      <Header mode={theme} onModeClick={setTheme} user={user} />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/heroes" replace />} />
          <Route path="auth" element={<AuthView user={user} onLoginSuccess={onLoginSuccess} onLogoutSuccess={onLogoutSuccess} />} />
          <Route path="heroes">
            <Route index element={<HeroesBrowseView />} />
            <Route path=":heroId" element={<HeroViewLayout />}>
              <Route index element={<HeroMainView isEditable={user?.hasEditAccess} />} />
              <Route path="edit">
                {user?.hasEditAccess && <Route path=":category" element={<HeroEditView />} />}
              </Route>
              <Route path=":category" element={<HeroMatchupViewLayout isEditable={user?.hasEditAccess} />}>
                <Route path=":secondaryHeroId">
                  <Route index element={<HeroMatchupView />} />
                  {user?.hasEditAccess && <Route path="edit" element={<HeroMatchupEditView />} />}
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <Footer theme={theme} />
    </div>
  );
}

export default App;
