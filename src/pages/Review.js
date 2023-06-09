import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, Tooltip } from "@mui/material";
import Comments from "../components/Comments";
import { useAuth } from "../auth/auth";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import Badge from "@mui/material/Badge";

function Review() {
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  const { selectedReview } = auth;
  const [open, setOpen] = React.useState(false);
  // const [like, setLike] = React.useState(false);

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
          reviewId: selectedReview?.id,
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

  const handleCreateLike = (newLike) => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/createLike`,
        {
          like: newLike,
          memberId: auth.user?.memberId,
          reviewId: selectedReview?.id,
        },
        { headers: { "x-access-token": auth?.user?.token } }
      )
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
           console.log('liked')
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
          width: "95% ",
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
            <Typography gutterBottom variant="h4" component="div">
              {selectedReview?.title}
            </Typography>{" "}
            <Typography align="right">
              {theme.locale === "uz" ? "Muallif" : "Author"}:{" "}
              {selectedReview?.username}
            </Typography>
            <Box
              sx={{
                display: "flex",
                columnGap: "4px",
                mb: "20px",
                justifyContent: "flex-end",
              }}
            >
              <Typography>
                {theme.locale === "uz"
                  ? "Ushbu tahlilga baho bering"
                  : "Rate this review"}
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
                    defaultValue={Math.round(selectedReview.rate)}
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
            <Box
              sx={{
                display: "flex",
                columnGap: "4px",
                mb: "20px",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Typography>
                {theme.locale === "uz" ? "Yoqdi" : "Like"}
              </Typography>

              <Tooltip
                placement="bottom"
                title={
                  !!auth?.user?.auth
                    ? ""
                    : theme.locale === "uz"
                    ? "Iltimos, like bosish ro'yxatdan o'ting!"
                    : "Please, sign up for leaving a like!"
                }
              >
                <IconButton onClick={() => handleCreateLike(1)}>
                  <Badge badgeContent={4} color="primary">
                    <ThumbUpIcon fontSize="medium" />
                  </Badge>
                </IconButton>
              </Tooltip>
              <IconButton onClick={() => handleCreateLike(0)}>
                <Badge badgeContent={4} color="primary">
                  <ThumbDownIcon fontSize="medium" />
                </Badge>
              </IconButton>

              <Typography>
                {theme.locale === "uz" ? "Yoqmadi" : "Dislike"}
              </Typography>
            </Box>
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
      <Comments reviewId={selectedReview?.id} memberId={auth.user?.memberId} />
    </Box>
  );
}

export default Review;
