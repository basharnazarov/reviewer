import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Header() {
    const theme = useTheme();
    const [language, setLanguage] = React.useState(1);

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#ddd",
                color: "text.primary",
                height: "50px",
                display: "flex",
                alignItems: "center",
                columnGap: "3px",
                justifyContent: "center",
            }}
        >
            <Typography variant="h6" fontWeight={600}>
                Reviewer
            </Typography>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Paper
                component="form"
                sx={{
                    p: "2px 4px",
                    display: "flex",
                    alignItems: "center",
                    width: 500,
                    height: 35,
                }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1,  }}
                    placeholder="e.g. Movies, Books, Games..."
                    inputProps={{ "aria-label": "search " }}
                />
                <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="search"
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Button variant="contained">Login</Button>
            <Button variant="contained">Register</Button>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="inherit">
                {theme.palette.mode === "dark" ? (
                    <Brightness7Icon />
                ) : (
                    <Brightness4Icon />
                )}
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <Select
                        sx={{ height: "30px" }}
                        value={language}
                        onChange={handleChange}
                    >
                        <MenuItem value={1}>English</MenuItem>
                        <MenuItem value={2}>Uzbek</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </Box>
    );
}

export default Header;
