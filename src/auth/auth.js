import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const localData = JSON.parse(localStorage.getItem("auth"));
    const [userData, setUserData] = useState(localData);

    const login = (user) => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/loginMember`, {
                username: user.username,
                password: user.password,
            })
            .then((response) => {
                if (response.data.message) {
                    console.log(response);
                } else {
                    localStorage.setItem("auth", JSON.stringify(response.data));
                    const localData = JSON.parse(localStorage.getItem("auth"));
                    setUserData(localData);
                }
            });
    };

    const logout = () => {
        console.log('check')
        localStorage.clear();
        window.open("http://localhost:5000/auth/logout", "_self");
        setUserData(null);
    };

    React.useEffect(() => {
        const getUser = () => {
            fetch(`${process.env.REACT_APP_BASE_URL}/auth/login/success`, {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("Authentication failed!");
                })
                .then((resObject) => {
                    localStorage.setItem(
                        "auth",
                        JSON.stringify(resObject.user)
                    );
                    const localData = JSON.parse(localStorage.getItem("auth"));
                    setUserData(localData);
                    axios
                    .post(`${process.env.REACT_APP_BASE_URL}/createMember`, {
                        email: localData.email,
                        username: localData.username,
                        id:localData.id,
                       
                    })
                    .then((response) => {
                        if (response.data.message) {
                            console.log(response.data.message);
                        } else {
                            console.log('user saved successfully')
                        }
                    })
                    .catch((err) => console.error(err));
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []);

    React.useEffect(() => {
        console.log(userData);
    }, [userData]);

    return (
        <AuthContext.Provider value={{ user: userData, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
