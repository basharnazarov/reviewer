import { Paper } from "@mui/material";
import React from "react";

function Footer() {
    return (
        <Paper
            sx={{
                width: "100%",
                color: "text.primary",
                height: "50px",
                display: "flex",
                alignItems: "center",
                columnGap: "3px",
                justifyContent: "center",
                minHeight:'7vh'
            }}
        >
            All rights reserved Copyright &copy; 2023
        </Paper>
    );
}

export default Footer;
