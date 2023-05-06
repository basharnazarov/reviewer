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
import { useAuth } from "../auth/auth";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

function Review() {
  const navigate = useNavigate();
  const auth = useAuth();
  const { selectedReview } = auth;
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleCreateRate = (newRate) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/createRate`,
        {
          rate: newRate,
          memberId: auth.user?.memberId,
          reviewId: selectedReview?.ID,
        },
        { headers: { "x-access-token": auth?.user?.token } }
      )
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          handleClick();
        }
      })
      .catch((err) => console.error(err));
  };

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
      >
        <CardMedia
          component="img"
          height="300"
          image={"https://www.dropbox.com/s/3rdzhzy76h9bmk8/reviewer.png?raw=1"}
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
              {selectedReview?.title}
            </Typography>{" "}
            <Typography>
              <i>{selectedReview?.username}</i>
            </Typography>
            <Rating
              name="half-rating"
              defaultValue={3}
              precision={1}
              onChange={(e) => {
                handleCreateRate(e.target.value);
              }}
            />
          </Box>

          <Typography variant="body2" color="text.secondary">
            {selectedReview?.content}
          </Typography>
        </CardContent>
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Thank you for your rate!"
      />
      <Typography variant="h6" sx={{ m: "20px 0px" }}>
        {" "}
        Comments
      </Typography>
      <Comments reviewId={selectedReview?.ID} memberId={auth.user?.memberId} />
    </Box>
  );
}

export default Review;
