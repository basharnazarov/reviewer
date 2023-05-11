import React from "react";
import {
  Paper,
  Button,
  FormControl,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useAuth } from "../auth/auth";
import { useTheme } from "@mui/material/styles";
import moment from "moment";

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

function Comments({ reviewId, memberId }, props) {
  const auth = useAuth();
  const theme = useTheme();
  const [newComment, setNewComment] = React.useState({
    memberId,
    reviewId,
    content: "",
  });
  const [comments, setComments] = React.useState([]);

  const handleCreateComment = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/createComment`,
        {
          content: newComment.content,
          memberId: newComment.memberId,
          reviewId: newComment.reviewId,
        },
        { headers: { "x-access-token": auth?.user?.token } }
      )
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    const fetchComments = async () => {
      const result = await axios
        .post(`${process.env.REACT_APP_BASE_URL}/comments`, {
          reviewId,
        })
        .then((response) => {
          if (response.data.message) {
            console.log(response.data.message);
          } else {
            console.log(response.data);
            return response.data;
          }
        })
        .catch((err) => console.error(err));
      if (result.length > 0) {
        setComments(result);
      }
    };
    fetchComments();
  }, [props.id]);

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        rowGap: "10px",
        flexDirection: "column",
        p: "20px",
      }}
      elevation={3}
    >
      <FormControl sx={{ width: "100%" }}>
        <TextField
          onChange={(e) =>
            setNewComment({ ...newComment, content: e.target.value })
          }
          placeholder={
            theme.locale === "uz"
              ? "Izohingizni qoldiring..."
              : "Leave your comment here..."
          }
          InputProps={{
            endAdornment: (
              <Button sx={{ ml: "auto" }} onClick={handleCreateComment}>
                {theme.locale === "uz" ? "Jo'natish" : "Post"}
              </Button>
            ),
          }}
        />
      </FormControl>
      {comments.length > 0
        ? comments.map((item) => {
            return (
              <Box>
                <Stack
                  direction="row"
                  spacing={2}
                  key={item.id}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <Avatar
                    alt="avatar"
                    src={`https://robohash.org/${item.id}`}
                  />
                  <Typography variant="body1">{item.content}</Typography>
                </Stack>
                <Typography variant="caption" sx={{ float: "right" }}>
                  {theme.locale === "uz" ? "Yaratilgan sana" : "Posted on"}:{" "}
                  {moment(item.createdAt).format("lll")}
                </Typography>
              </Box>
            );
          })
        : theme.locale === "uz"
        ? "Hozircha hech qanday izohlar yo'q"
        : "No comments yet"}
    </Paper>
  );
}

export default Comments;
