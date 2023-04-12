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


function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
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
                        path="/review"
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
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
