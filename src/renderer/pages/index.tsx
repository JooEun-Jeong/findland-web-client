import React, { useCallback, useEffect, useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { Admin } from '@pages/Admin';
import { themeSelector } from '@theme/themeSelector';

import { KakaoCallback } from './Callbacks/KakaoCallback';
import { Contact } from './Contact';
import { Home } from './Home';
import { Login } from './Login';
import { MyPage } from './MyPage';
import { ProtectedRoute } from './ProtectedRouter';
import { Search } from './SearchList';
import { ErrorFallback } from '../components/ErrorBoundary';
import { SearchSwiper } from '../containers/SearchSwiper';

const AppRenderer: React.FC = () => {
  const themeMode = useMemo(() => createTheme(themeSelector('light')), []);

  const setScreenSize = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);
    return () => window.removeEventListener('resize', setScreenSize);
  }, [setScreenSize]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themeMode}>
        <CssBaseline />
        <Router>
          <AppRoute />
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export const AppRoute: React.FC = () => {
  return (
    <React.Fragment>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/kakaoCallback" element={<KakaoCallback />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/searchsw" element={<SearchSwiper />} />
            <Route index path="/findLand" element={<Home />} />
            <Route path="/search/:name" element={<Search />} />
            <Route path="/myPage" element={<MyPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<Navigate to={'/findLand'} />} />
        </Routes>
      </ErrorBoundary>
    </React.Fragment>
  );
};

export default AppRenderer;
