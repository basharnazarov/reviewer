import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Slide, IconButton, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTheme } from "@mui/material/styles";
import ParticleBackground from "../components/ParticleBackground";

function MainLayout({ children }) {
  const [visible, setVisible] = React.useState(false);
  const theme = useTheme();
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: "990px", m: "auto", p: "20px 0px" }}>{children}</Box>
      <Footer />

      <ParticleBackground />

      <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
        <Tooltip title="Scroll to top" placement="top">
          <IconButton
            color="default"
            onClick={scrollToTop}
            sx={{
              background: theme.palette.main,
              position: "fixed",
              right: "50px",
              bottom: "30px",
              "&:hover": {
                cursor: "pointer",
                background: theme.palette.main,
              },
            }}
          >
            <KeyboardArrowUpIcon />
          </IconButton>
        </Tooltip>
      </Slide>
    </Box>
  );
}

export default MainLayout;
