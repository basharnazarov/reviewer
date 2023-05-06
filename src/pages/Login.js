import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import GitHubIcon from '@mui/icons-material/GitHub';
import ParticleBackground from "../components/ParticleBackground";

function Login() {
    const [details, setDetails] = React.useState({
        username: "",
        password: "",
    });
    const auth = useAuth();
    const navigate = useNavigate();

    const handleGoogleAuth = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };

    const handleFacebookLogin = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
      };

    const handleGithubLogin = () => {
        window.open("http://localhost:5000/auth/github", "_self");
      };

    const handleLogin = (e) => {
        e.preventDefault();
        auth.login(details);
    };
    React.useEffect(() => {
        if (auth?.user !== null) {
            navigate("/");
        }
    }, [auth?.user]);

    return (
        <div style={{ marginTop: "5%" }}>
            <ParticleBackground />
            <Paper
                elavation={3}
                style={{
                    maxWidth: "400px",
                    height: "400px",
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
                    <Box>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ display: "flex", alignItems: "center", justifyContent:'center' }}
                        >
                            <Typography>Sign in with:</Typography>
                            <IconButton color="primary" onClick={handleGoogleAuth}>
                                <GoogleIcon />
                            </IconButton>
                            
                            <IconButton color="primary"  onClick={handleFacebookLogin} >
                                <FacebookIcon />
                            </IconButton>
                            <IconButton color="primary" onClick={handleGithubLogin}>
                                <GitHubIcon />
                            </IconButton>
                        </Stack>
                    </Box>

                    <Typography>
                       Not a member?{" "}
                        <Button
                            component={Link}
                            to="/register"
                            variant="outlined"
                            size="small"
                            sx={{ml:'20px'}}
                        >
                            Create an account
                        </Button>
                    </Typography>
                </Box>
            </Paper>
        </div>
    );
}

export default Login;
