import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Admin from "./components/Admin";
import Register from "./pages/Register";
import RequireAuth from "./routes/RequireAuth";
import { AuthProvider } from "./auth/auth";
import Homepage from "./pages/Homepage";
import Review from "./pages/Review";
import UserPage from "./pages/UserPage";
import MainLayout from "./layouts/MainLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";



function App() {
  const mode = JSON.parse(localStorage.getItem("mode"));
  const locale = JSON.parse(localStorage.getItem("locale"));
  const theme = createTheme({
    palette: {
      mode: mode ? "light" : "dark",
      main: '#1976d2',
    },
    locale: locale ? "uz" : "en",
  });

  return (
    <AuthProvider>
    
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Homepage />
                </MainLayout>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/review/"
              element={
                <MainLayout>
                  <Review />
                </MainLayout>
              }
            />
            <Route element={<RequireAuth />}>
              <Route
                path="/admin"
                element={
                  <MainLayout>
                    <Admin />
                  </MainLayout>
                }
              />
            </Route>
            <Route element={<RequireAuth />}>
              <Route
                path="/user"
                element={
                  <MainLayout>
                    <UserPage />
                  </MainLayout>
                }
              />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
