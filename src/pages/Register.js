import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";

function Register() {
    const [details, setDetails] = React.useState({
        email: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleRegister = () => {
        axios
            .post(`${process.env.REACT_APP_BASE_URL}/createMember`, {
                email: details.email,
                username: details.username,
                password: details.password,
               
            })
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    navigate("/");
                }
            })
            .catch((err) => console.error(err));
    };
    return (
        <div style={{ marginTop: "5%" }}>
            <ParticleBackground/>
            <Paper
                elavation={3}
                style={{
                    maxWidth: "400px",
                    height: "400px",
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
                     
                        label="Username"
                        variant="standard"
                        onChange={(e) =>
                            setDetails({ ...details, username: e.target.value })
                        }
                    />
                    <TextField
                       
                        label="E-mail"
                        variant="standard"
                        type="email"
                        onChange={(e) =>
                            setDetails({ ...details, email: e.target.value })
                        }
                    />
                    <TextField
                      
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
                   <Typography variant="subtitle" align="center" component={Link} to='/' color={'#fff'}>
                    Go to homepage
                   </Typography>
                </Box>
                
            </Paper>
            
        </div>
    );
}

export default Register;
