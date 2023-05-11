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
import useMediaQuery from "@mui/material/useMediaQuery";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";

function Header() {
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  const matches = useMediaQuery("(min-width:800px)");
  const locale = JSON.parse(localStorage.getItem("locale"));
  const [sidebar, setSidebar] = React.useState(false);
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

  const Sidebar = () => (
    <Box
      sx={{
        width: "310px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: "5px",
      }}
    >
      {!auth.user ? (
        <Box
          component={Paper}
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "3px",
            borderRadius: "5px",
            width: "100%",
            p:'5px'
          }}
        >
          <Box
            sx={{
              width: "190px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{ mr: "5px", width: "100px" }}
              size="small"
              variant="contained"
              onClick={() => navigate("/login")}
            >
              {theme.locale === "uz" ? "Kirish" : "Login"}
            </Button>
            <Button
              sx={{
                width: "100px",
                height: "30px",
                fontSize: theme.locale === "uz" ? "9px" : "default",
              }}
              size="small"
              variant="contained"
              onClick={() => navigate("/register")}
            >
              {theme.locale === "uz" ? "Ro'yxatdan o'tish" : "Register"}
            </Button>
          </Box>
          <Divider sx={{ width: "95%" }} />
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}
          >
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
            <Divider sx={{ height: 22 }} orientation="vertical" />
            <Box sx={{ minWidth: 60, borderRadius: "5px" }}>
              <FormControl fullWidth>
                <Select
                  sx={{ height: "30px" }}
                  value={Boolean(locale)}
                  onChange={handleChange}
                >
                  <MenuItem value={false}>Eng</MenuItem>
                  <MenuItem value={true}>O'z</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider sx={{ width: "95%" }} />
          <Paper
            component="form"
            elevation={4}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "90%",
              height: 35,
              mb: "10px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={
                theme.locale === "uz"
                  ? "Kinolar, kitoblar, o'yinlar..."
                  : "e.g. Movies, Books, Games..."
              }
              inputProps={{ "aria-label": "search " }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      ) : (
        <Box
          component={Paper}
          elevation={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            rowGap: "3px",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", columnGap: "10px" }}
          >
            <Typography sx={{ ml: "20px" }}>{auth.user.username}</Typography>
            <Divider sx={{ height: 22 }} orientation="vertical" />
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
            <Divider sx={{ height: 22 }} orientation="vertical" />
            <Box sx={{ minWidth: 60, borderRadius: "5px" }}>
              <FormControl fullWidth>
                <Select
                  sx={{ height: "30px" }}
                  value={Boolean(locale)}
                  onChange={handleChange}
                >
                  <MenuItem value={false}>Eng</MenuItem>
                  <MenuItem value={true}>O'z</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider sx={{ width: "95%" }} />
          <MenuItem
            onClick={() => {
              handleClose();
              navigate("/user");
            }}
          >
            <ListItemIcon>
              <Avatar
                sx={{ mr: "15px" }}
                src={auth.user?.photo ? auth.user.photo : ""}
              />
            </ListItemIcon>{" "}
            {theme.locale === "uz" ? "Shaxsiy kabinet" : "Profile"}
          </MenuItem>
          <Divider sx={{ width: "95%" }} />
          <MenuItem
            onClick={() => {
              handleClose();
              auth.logout();
            }}
          >
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            {theme.locale === "uz" ? "Chiqish" : "Logout"}
          </MenuItem>
          <Divider sx={{ width: "95%" }} />
          <Paper
            component="form"
            elevation={4}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "90%",
              height: 35,
              mb: "10px",
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={
                theme.locale === "uz"
                  ? "Kinolar, kitoblar, o'yinlar..."
                  : "e.g. Movies, Books, Games..."
              }
              inputProps={{ "aria-label": "search " }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
      )}
    </Box>
  );

  return (
    <Box>
      {matches ? (
        <Paper
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
            elevation={4}
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
              placeholder={
                theme.locale === "uz"
                  ? "Kinolar, kitoblar, o'yinlar..."
                  : "e.g. Movies, Books, Games..."
              }
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
                sx={{ mr: "5px", width: "100px" }}
                size="small"
                variant="contained"
                onClick={() => navigate("/login")}
              >
                {theme.locale === "uz" ? "Kirish" : "Login"}
              </Button>
              <Button
                sx={{
                  width: "100px",
                  height: "30px",
                  fontSize: theme.locale === "uz" ? "9px" : "default",
                }}
                size="small"
                variant="contained"
                onClick={() => navigate("/register")}
              >
                {theme.locale === "uz" ? "Ro'yxatdan o'tish" : "Register"}
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
                height: '35px'
              }}
            >
              <Typography sx={{ ml: "10px", fontSize:'14px' }}>{auth.user.username}</Typography>
              <Box sx={{ display: "flex" }}>
                <Divider sx={{ height: 22 }} orientation="vertical" />
                <KeyboardArrowDownIcon
                  onClick={handleClick}
                  sx={{ "&:hover": { cursor: "pointer" } }}
                />
              </Box>
            </Box>
          )}
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
                <MenuItem value={true}>O'zbek</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Paper>
      ) : (
        <Paper
          sx={{
            width: "100%",
            color: "text.primary",
            height: "50px",
            display: "flex",
            alignItems: "center",
            p: "10px",
            justifyContent: "space-between",
          }}
        >
          <Drawer
            anchor={"right"}
            open={sidebar}
            onClose={() => setSidebar(false)}
          >
            <Sidebar />
          </Drawer>
          <Typography
            variant="h6"
            fontWeight={600}
            onClick={() => navigate("/")}
            sx={{ "&:hover": { cursor: "pointer" } }}
          >
            Reviewer
          </Typography>
          <IconButton onClick={() => setSidebar(true)}>
            {" "}
            <MenuIcon />
          </IconButton>
        </Paper>
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
          <Avatar src={auth.user?.photo ? auth.user.photo : ""} />{" "}
          {theme.locale === "uz" ? "Shaxsiy kabinet" : "Profile"}
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
          {theme.locale === "uz" ? "Chiqish" : "Logout"}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default Header;
