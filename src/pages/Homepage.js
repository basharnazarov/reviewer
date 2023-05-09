import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import ReviewCard from "../components/ReviewCard";
import Chip from "@mui/material/Chip";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import axios from "axios";
import { useAuth } from "../auth/auth";

function Homepage(props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const auth = useAuth();
  const matches = useMediaQuery('(min-width:800px)');
  const [allReviews, setAllReviews] = React.useState([]);
  const [topRated, setTopRated] = React.useState([]);

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

  const images = [
    "https://www.dropbox.com/s/3rdzhzy76h9bmk8/reviewer.png?raw=1",
    "https://www.dropbox.com/s/ncyb0qbgt3dg67h/avengers.jpg?raw=1",
    "https://www.dropbox.com/s/2we1xngtno7004r/godofwar.jpg?raw=1",
    "https://www.dropbox.com/s/xr9eom0uq60v4ca/harrypotter.jpg?raw=1",
  ];

  React.useEffect(() => {
    const fetchAllReviews = async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/allReviews`)
        .then((response) => {
          if (response.data.message) {
            console.log(response.data.message);
          } else {
            // console.log(response.data);
            return response.data;
          }
        })
        .catch((err) => console.error(err));
      if (result.length > 0) {
        setAllReviews(result);
      }
    };

    const fetchTopRated = async () => {
      const result = await axios
        .get(`${process.env.REACT_APP_BASE_URL}/topRated`)
        .then((response) => {
          if (response.data.message) {
            console.log(response.data.message);
          } else {
            // console.log(response.data);
            return response.data;
          }
        })
        .catch((err) => console.error(err));
      if (result.length > 0) {
        setTopRated(result);
      }
    };
    fetchAllReviews();
    fetchTopRated()
  }, [props.id]);

  return (
    <Box sx={{ display: "flex", flexDirection: matches ?'row':'column', gap:'10px', p:'10px'}}>
      <Box>
        <Typography variant="h5">
          {theme.locale === "en"
            ? "Recently Added Reviews"
            : "Eng so'nggi tahlillar"}
        </Typography>
        {allReviews.length > 0
          ? allReviews.map((item) => {
              return (
                <ReviewCard img={images[0]} key={item.title} details={item} />
              );
            })
          : ""}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
       
          width: "auto",
          rowGap: "5px",
        }}
      >
        <Typography variant="h5">
          {theme.locale === "uz" ? "Teglar buluti" : "Tags Cloud"}
        </Typography>
        <Paper
          sx={{
            width: "280px",
            height: "auto",
            p: "20px",
            mb: "10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
          {tags.map((item, index) => {
            return <Chip label={item} key={item} clickable />;
          })}
        </Paper>
        <Typography variant="h5" align="center">
          {" "}
          {theme.locale === "uz"
            ? "Eng yuqori reytingdagi tahlilar"
            : "Top Rated Reviews"}
        </Typography>
        <Paper
          sx={{
            width: "280px",
            height: "auto",
            p: "20px",
          }}
        >
          <ol>
            {topRated.length > 0
              ? topRated.map((item, index) => {
                  return (
                    <Typography
                      key={item.title}
                      sx={{
                        height: "25px",
                        p: "2px",
                        borderRadius: "5px",
                        mb: "3px",
                        "&:hover": {
                          cursor: "pointer",
                          opacity: "0.8",
                        },
                      }}
                      onClick={() => {
                        localStorage.setItem("review", JSON.stringify(item));
                        const reviewData = JSON.parse(
                          localStorage.getItem("review")
                        );
                        auth.setSelectedReview(reviewData);
                        navigate("/review");
                      }}
                    >
                      {index + 1}. {item.title.substring(0, 20) + "..."}
                    </Typography>
                  );
                })
              : ""}
          </ol>
        </Paper>
      </Box>
    </Box>
  );
}

export default Homepage;
