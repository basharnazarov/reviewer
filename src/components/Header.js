import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useAuth } from "../auth/auth";

function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  const locale = JSON.parse(localStorage.getItem("locale"));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleChange = (event) => {
    if (event.target.value) {
      localStorage.setItem("locale", JSON.stringify(true));
    } else {
      localStorage.setItem("locale", JSON.stringify(false));
    }
    window.location.reload();
  };

  return (
    <Box
      sx={{
        width: "100%",
        color: "text.primary",
        height: "50px",
        display: "flex",
        alignItems: "center",
        columnGap: "3px",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={600}
        onClick={() => navigate("/")}
        sx={{ "&:hover": { cursor: "pointer" } }}
      >
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
          sx={{ ml: 1, flex: 1 }}
          placeholder="e.g. Movies, Books, Games..."
          inputProps={{ "aria-label": "search " }}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      {!auth.user ? (
        <Box
          sx={{
            width: "190px",
            display: "flex",
            alignItems: "center",
            
          }}
        >
          <Button
            sx={{ mr: "5px", width:'100px'}}
            size="small"
            variant="contained"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            sx={{width:'100px'}}
            size="small"
            variant="contained"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Box>
      ) : (
        <Box
          component={Paper}
          elevation={2}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            p: "4px 4px 4px 6px",
            borderRadius: "5px",
            width: "190px",
          }}
        >
          <Typography sx={{ ml: "20px" }}>{auth.user.username}</Typography>
          <Box sx={{ display: "flex" }}>
            <Divider sx={{ height: 22 }} orientation="vertical" />
            <KeyboardArrowDownIcon
              onClick={handleClick}
              sx={{ "&:hover": { cursor: "pointer" } }}
            />
          </Box>
        </Box>
      )}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 7,
              width: 10,
              height: 8,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            navigate("/user");
          }}
        >
          <Avatar src={auth.user?.photo ? auth.user.photo : ""} /> Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            auth.logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        color="inherit"
        onClick={() => {
          if (theme.palette.mode === "light") {
            localStorage.setItem("mode", JSON.stringify(false));
          } else {
            localStorage.setItem("mode", JSON.stringify(true));
          }
          window.location.reload();
        }}
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Box sx={{ minWidth: 120, borderRadius: "5px" }}>
        <FormControl fullWidth>
          <Select
            sx={{ height: "30px" }}
            value={Boolean(locale)}
            onChange={handleChange}
          >
            <MenuItem value={false}>English</MenuItem>
            <MenuItem value={true}>Uzbek</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Header;
