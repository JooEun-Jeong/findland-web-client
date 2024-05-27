import React, { useEffect, useMemo } from 'react';

import { CssBaseline } from '@mui/material';
import { ThemeProvider, StyledEngineProvider, createTheme } from '@mui/material/styles';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { themeSelector } from '@theme/themeSelector';

import { KakaoCallback } from './Callbacks/KakaoCallback';
import { Home } from './Home';
import { Login } from './Login';
import { Search } from './SearchList';
import { SearchSwiper } from '../containers/SearchSwiper';

const AppRenderer: React.FC = () => {
  const themeMode = useMemo(() => createTheme(themeSelector('light')), []);

  useEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

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
      <Routes>
        {/* <Route path="/findLand" element={<ProtectedRoute />}>
          <Route index element={<Home />} />
        </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/searchsw" element={<SearchSwiper />} />
        <Route index path="/findLand" element={<Home />} />
        <Route path="/search/:name" element={<Search />} />

        <Route path="*" element={<Navigate to={'/findLand'} />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRenderer;
