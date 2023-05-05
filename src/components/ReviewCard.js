import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import moment from 'moment'
import { useAuth } from "../auth/auth";


function ReviewCard(props) {
  const navigate = useNavigate();
  const auth = useAuth();
  const { details } = props

  return (
    <Card
      sx={{
        maxWidth: 700,
        height: 250,
        mb: "10px",
        "&:hover": { cursor: "pointer", opacity: "0.6" },
      }}
      onClick={() => {
        localStorage.setItem("review", JSON.stringify(details));
        const reviewData = JSON.parse(localStorage.getItem("review"));
        auth.setSelectedReview(reviewData)
        navigate("/review")
      }}
    >
      <CardMedia
        component="img"
        height="90"
        image={props.img}
        alt="avengers"
        sx={{
          backgroundRepeat: "no-repeat",
          objectFitL: "cover",
          objectPosition: "center",
        }}
      />
      <CardContent>
      
        <Typography gutterBottom variant="h5" component="div">
          {details.title}
        </Typography>
        

        <Typography variant="body2" color="text.secondary">
          {details.content.substring(0, 120) + '...'}
        </Typography>
      </CardContent>
      <CardActions sx={{ml:'2%', mr:'2%',display:'flex', justifyContent:'space-between'}}>
       
        <Rating name="half-rating" defaultValue={4} precision={1} />
        <Typography variant="caption">
          <i>Created by {details.username} on {moment(details.createdAt).format('ll')}</i>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default ReviewCard;
