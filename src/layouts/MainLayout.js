import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";

function MainLayout({ children }) {
    return (
        <Box>
            <Header />
            <Box sx={{ maxWidth: "990px", m: "auto", p: "20px 0px" }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
}

export default MainLayout;
