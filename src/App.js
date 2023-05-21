import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { Protected, AdminLayout } from './Route';

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

import SplashView from './views/SplashView';

import AnalyticsEventsView from './views/admin/AnalyticsEventsView';
import AnalyticsPageVisitsView from './views/admin/AnalyticsPageVisitsView';
import AnalyticsPageVisitsByDayView from './views/admin/AnalyticsPageVisitsByDayView';

import { getWhitelist } from './api/whitelist';
import { trackAnalytics, trackPage } from './api/analytics';

import { retrieveUser, persistUser, removeUser } from './utils/auth';

import './App.css';

function App() {
  const [theme, setTheme] = useState(true);
  const [user, setUser] = useState(undefined);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (process.env.NODE_ENV === 'production') {
      trackPage(window.location.pathname, user?.email, navigator?.userAgent);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);
  useEffect(() => {
    retrieveUser(setUser);
    setTimeout(() => {
      setIsLoadingUser(false);
    }, 1500);
  }, []);
  async function onLoginSuccess(credentials) {
    const row = await getWhitelist({ email: credentials?.email });
    credentials['hasEditAccess'] = row ? true : false;
    trackAnalytics('LOG_IN', credentials?.email, credentials, navigator?.userAgent);
    setUser(credentials);
    persistUser(credentials);
    navigate(-1);
  }
  function onLogoutSuccess() {
    trackAnalytics('LOG_OUT', user?.email, user, navigator?.userAgent);
    setUser(undefined);
    removeUser();
    navigate(-1);
  }

  if (isLoadingUser) return <SplashView />
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
                  <Route path=":category" element={<Protected isAllowed={user?.hasEditAccess}>
                    <HeroEditView />
                  </Protected> } />
              </Route>
              <Route path=":category" element={<HeroMatchupViewLayout isEditable={user?.hasEditAccess} />}>
                <Route path=":secondaryHeroId">
                  <Route index element={<HeroMatchupView />} />
                  <Route path="edit" element={<Protected isAllowed={user?.hasEditAccess}>
                    <HeroMatchupEditView />
                  </Protected>} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="admin" element={<Protected isAllowed={user?.hasEditAccess}><AdminLayout /></Protected>}>
              <Route index element={<Navigate to="analytics" replace /> } />
              <Route path="analytics">
                <Route index element={<Navigate to="events" replace />} />
                <Route path="events" element={<AnalyticsEventsView />} />
                <Route path="page-visits" element={<AnalyticsPageVisitsView />} />
                <Route path="page-visits-by-day" element={<AnalyticsPageVisitsByDayView />} />
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
