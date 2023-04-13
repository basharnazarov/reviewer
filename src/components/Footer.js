import { Box } from "@mui/material";
import React from "react";

function Footer() {
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
            Footer
        </Box>
    );
}

export default Footer;
