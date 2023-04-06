import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [details, setDetails] = React.useState({
        email: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleRegister = () => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/register`, {
                email: details.email,
                username: details.username,
                password: details.password,
                status: "active",
                registerTime: new Date(),
                lastLoginTime: new Date(),
            })
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <div style={{ marginTop: "5%" }}>
            <Paper
                elavation={3}
                style={{
                    maxWidth: "300px",
                    height: "300px",
                    margin: "auto",
                    padding: "5px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        rowGap: "25px",
                    }}
                >
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                        onChange={(e) =>
                            setDetails({ ...details, username: e.target.value })
                        }
                    />
                    <TextField
                        id="standard-basic"
                        label="E-mail"
                        variant="standard"
                        type="email"
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        }
                    />
                    <TextField
                        id="standard-basic"
                        type="password"
                        label="Password"
                        variant="standard"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                    />
                    <Button variant="contained" onClick={handleRegister}>
                        Register
                    </Button>
                </Box>
            </Paper>
        </div>
    );
}

export default Register;
