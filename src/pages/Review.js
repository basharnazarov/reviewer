import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Comments from "../components/Comments";

function Review() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Card
        sx={{
          width: "100% ",
          textAlign: "center",
          height: "auto",
        }}
        onClick={() => navigate("/review")}
      >
        <CardMedia
          component="img"
          height="300"
          image={"https://www.dropbox.com/s/ncyb0qbgt3dg67h/avengers.jpg?raw=1"}
          alt="avengers"
          sx={{
            backgroundRepeat: "no-repeat",
            objectFitL: "cover",
            objectPosition: "center",
          }}
        />
        <CardContent>
          <Box>
            <Typography gutterBottom variant="h5" component="div">
              Avengers
            </Typography>{" "}
            <Typography>
              <i>Author Name</i>
            </Typography>
            <Rating name="half-rating" defaultValue={3} precision={1} />
          </Box>

          <Typography variant="body2" color="text.secondary">
            Avengerss are a widespread group of squamate reptiles, with over
            6,000 species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </Card>
      <Typography variant="h6" sx={{m: '20px 0px'}}> Comments</Typography>
      <Comments />
    </Box>
  );
}

export default Review;
