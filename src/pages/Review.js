import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Box, Tooltip } from "@mui/material";
import Comments from "../components/Comments";
import { useAuth } from "../auth/auth";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";

function Review() {
  const navigate = useNavigate();
  const theme = useTheme();
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
            <Tooltip
              placement="top"
              title={
                !!auth?.user?.auth
                  ? ""
                  : theme.locale === "uz"
                  ? "Iltimos, baholash uchun ro'yxatdan o'ting!"
                  : "Please, sign up for leaving a rate!"
              }
            >
              <div>
                <Rating
                  name="half-rating"
                  defaultValue={4}
                  precision={1}
                  readOnly={!!auth?.user?.auth ? false : true}
                  onChange={(e) => {
                    if (!!auth?.user?.auth) {
                      handleCreateRate(e.target.value);
                    }
                  }}
                />
              </div>
            </Tooltip>
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
        message={
          theme.locale === "uz"
            ? "Bahoyingiz uchun tashakkur!"
            : "Thank you for your rate!"
        }
      />
      <Typography variant="h6" sx={{ m: "20px 0px" }}>
        {theme.locale === "uz" ? "Izohlar" : "Comments"}
      </Typography>
      <Comments reviewId={selectedReview?.ID} memberId={auth.user?.memberId} />
    </Box>
  );
}

export default Review;
