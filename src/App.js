import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
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
  return (
    <div className={`app ${theme ? 'dark-mode' : 'light-mode'}`}>
      <Header mode={theme} onModeClick={setTheme} />
      <Routes>
        <Route path="/">
          <Route index element={<Navigate to="/heroes" replace />} />
          <Route path="heroes">
            <Route index element={<HeroesBrowseView />} />
            <Route path=":heroId" element={<HeroViewLayout />}>
              <Route index element={<HeroMainView />} />
              <Route path="edit">
                <Route path=":category" element={<HeroEditView />} />
              </Route>
              <Route path=":category" element={<HeroMatchupViewLayout />}>
                <Route path=":secondaryHeroId">
                  <Route index element={<HeroMatchupView />} />
                  <Route path="edit" element={<HeroMatchupEditView />} />
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
