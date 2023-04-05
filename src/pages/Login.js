import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

function Login(props) {
    const [details, setDetails] = React.useState({
        username: "",
        password: "",
    });
    const auth = useAuth();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        auth.login(details);
        navigate("/");
    };

    return (
        <div style={{ marginTop: "5%" }}>
            <Paper
                elavation={3}
                style={{
                    maxWidth: "300px",
                    height: "300px",
                    margin: "auto",
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
                        type="password"
                        label="Password"
                        variant="standard"
                        onChange={(e) =>
                            setDetails({ ...details, password: e.target.value })
                        }
                    />
                    <Button
                        variant="contained"
                        component={Link}
                        onClick={handleLogin}
                    >
                        Login
                    </Button>
                    <Typography>
                        Not registered?{" "}
                        <Button
                            component={Link}
                            to="/register"
                            variant="outlined"
                            size="small"
                        >
                            Register
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </div>
    );
}

export default Login;
