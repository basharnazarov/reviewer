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

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/review" element={<Review/>}/>
                    <Route path="/user" element={<UserPage/>}/>
                    <Route element={<RequireAuth />}>
                        <Route path="/admin" element={<Admin />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
