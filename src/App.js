import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

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
import './App.css';

function App() {
  const [theme, setTheme] = useState(true);
  const [user, setUser] = useState(undefined);
  return (
    <div className={`app ${theme ? 'dark-mode' : 'light-mode'}`}>
      <Header mode={theme} onModeClick={setTheme} user={user} />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/heroes" replace />} />
          <Route path="auth" element={<AuthView user={user} setUser={setUser} />} />
          <Route path="heroes">
            <Route index element={<HeroesBrowseView />} />
            <Route path=":heroId" element={<HeroViewLayout />}>
              <Route index element={<HeroMainView user={user} />} />
              <Route path="edit">
                {user && <Route path=":category" element={<HeroEditView />} />}
              </Route>
              <Route path=":category" element={<HeroMatchupViewLayout user={user} />}>
                <Route path=":secondaryHeroId">
                  <Route index element={<HeroMatchupView />} />
                  {user && <Route path="edit" element={<HeroMatchupEditView />} />}
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
