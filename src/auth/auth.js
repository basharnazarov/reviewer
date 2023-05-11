import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const localData = JSON.parse(localStorage.getItem("auth"));
  const reviewData = JSON.parse(localStorage.getItem("review"));
  const [userData, setUserData] = useState(localData);
  const [selectedReview, setSelectedReview] = React.useState(reviewData);

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
    // console.log("check");
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
          localStorage.setItem("auth", JSON.stringify(resObject.user));
          const localData = JSON.parse(localStorage.getItem("auth"));
          setUserData(localData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  React.useEffect(() => {
    // console.log(userData);
    // console.log("review", selectedReview);
  }, [selectedReview]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        login,
        logout,
        selectedReview,
        setSelectedReview,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
