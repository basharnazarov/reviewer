import React from "react";
import MainLayout from "../layouts/MainLayout";
import { Box, Typography, Paper } from "@mui/material";
import ReviewCard from "../components/ReviewCard";

function Homepage() {
    const tags = [
        "movies",
        "books",
        "games",
        "avengers",
        "coming",
        "trailer",
        "bestseller",
        "top",
        "new",
        "republished",
        "stream",
        "budget",
    ];

    const topRated = [
        "Avergers:End game",
        "Interstellar",
        "Lucy",
        "Forest Gump",
    ];

    const images = ['https://www.dropbox.com/s/3rdzhzy76h9bmk8/reviewer.png?raw=1', 'https://www.dropbox.com/s/ncyb0qbgt3dg67h/avengers.jpg?raw=1']
    return (
        <MainLayout>
            <Box sx={{ display: "flex", columnGap: "10px" }}>
                <Box>
                    <Typography variant="h5">Recently Added Reviews</Typography>
                    {images.map(item => {
                        return (<ReviewCard img={item}/>)
                    })}
                    
                
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "30%",
                        rowGap:'5px'
                    }}
                >
                    <Typography variant="h5">Tags Cloud</Typography>
                    <Paper
                        sx={{
                            width: "280px",
                            height: "auto",
                            p: "20px",
                            mb:'10px',
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "4px",
                        }}
                    >
                        {tags.map((item) => {
                            return (
                                <Box
                                    key={item}
                                    sx={{
                                        background: "#ddd",
                                        height: "25px",
                                        p: "2px",
                                        borderRadius: "5px",
                                    }}
                                >
                                    {item}
                                </Box>
                            );
                        })}
                    </Paper>
                    <Typography variant="h5">Top Rated Reviews</Typography>
                    <Paper
                        sx={{
                            width: "280px",
                            height: "auto",
                            p: "20px",
                        }}
                    >
                        <ol>                         
                            {topRated.map((item, index) => {
                                return (
                                    <Typography
                                        key={item}
                                        sx={{
                                            background: "#ddd",
                                            height: "25px",
                                            p: "2px",
                                            borderRadius: "5px",
                                            mb:'3px'
                                        }}
                                    >
                                        {index+1}. {item}
                                    </Typography>
                                );
                            })}
                        </ol>
                    </Paper>
                </Box>
            </Box>
        </MainLayout>
    );
}

export default Homepage;