import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ParticleBackground from "../components/ParticleBackground";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

function Register() {
  const [details, setDetails] = React.useState({
    email: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const theme = useTheme();
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
      <ParticleBackground />
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
            label={
              theme.locale === "uz" ? "Foydalanuvchining ismi" : "Username"
            }
            variant="standard"
            onChange={(e) =>
              setDetails({ ...details, username: e.target.value })
            }
          />
          <TextField
            label="E-mail"
            variant="standard"
            type="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
          />
          <TextField
            type="password"
            label={
              theme.locale === "uz" ? "Foydalanuvchining paroli" : "Password"
            }
            variant="standard"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
          />
          <Button variant="contained" onClick={handleRegister}>
            {theme.locale === "uz" ? "Ro'yxatdan o'tish" : "Create an account"}
          </Button>
          <Typography
            variant="subtitle"
            align="center"
            component={Link}
            to="/"
            color={"#fff"}
          >
            {theme.locale === "uz" ? "Bosh sahifaga qaytish" : "Go to homepage"}
          </Typography>
        </Box>
      </Paper>
    </div>
  );
}

export default Register;
