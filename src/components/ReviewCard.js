import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";

function ReviewCard(props) {
    const navigate = useNavigate()
    return (
        <Card sx={{ maxWidth: 700, height: 250, mb: '10px', '&:hover':{cursor:'pointer', opacity:'0.6'} }} onClick={()=>navigate('/review')}>
            <CardMedia
                component="img"
                height="90"
                image={props.img}
                alt="avengers"
                sx={{backgroundRepeat:'no-repeat', objectFitL:'cover', objectPosition:'center'}}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Avengers
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Avengerss are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                </Typography>
            </CardContent>
            <CardActions>
                <Typography><i>Author Name</i></Typography>

                <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            </CardActions>
        </Card>
    );
}

export default ReviewCard;
