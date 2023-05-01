import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box, Slide } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function MainLayout({ children }) {
  const [visible, setVisible] = React.useState(false);

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
      <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
        <KeyboardArrowUpIcon
          onClick={scrollToTop}
          sx={{
            background: "white",
            color: "red",
            position: "fixed",
            right: "50px",
            bottom: "30px",
            "&:hover": { cursor: "pointer" },
          }}
        />
      </Slide>
    </Box>
  );
}

export default MainLayout;
