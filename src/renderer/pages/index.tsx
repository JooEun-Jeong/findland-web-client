import React, { useMemo } from "react";

import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Home } from "./Home";
import { Search } from "./SearchList";

const AppRenderer: React.FC = () => {
  return (
    <StyledEngineProvider injectFirst>
      {/* <ThemeProvider theme={themeMode}> */}
        <CssBaseline />
        <Router>
          <AppRoute />
        </Router>
      {/* </ThemeProvider> */}
    </StyledEngineProvider>
  );
};

export const AppRoute: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/search/:name" element={<Search />} />
        <Route path="*" element={<Navigate to={"/findLand"} />} />
      </Routes>
    </React.Fragment>
  );
};

export default AppRenderer;
