import React from "react";
import {
  Paper,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

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
function Comments() {
  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        rowGap:'10px',
        flexDirection: "column",
        p: "20px",
        
      }}
      elevation={3}
    >
      <FormControl sx={{ width: "100%" }}>
        <TextField
          placeholder="Leave your comment here…"
          InputProps={{
            endAdornment: <Button sx={{ ml: "auto" }}>Post</Button>,
          }}
        />
      </FormControl>
      {tags.map((item) => {
        const random = Math.floor(Math.random()*300)
        return (
          <Stack direction="row" spacing={2} key={item} sx={{display:'flex', alignItems:'center'}}>
            <Avatar
              alt="avatar"
              src={`https://robohash.org/${random}`}
            />
            <Typography>{item}</Typography>
          </Stack>
        );
      })}
    </Paper>
  );
}

export default Comments;
