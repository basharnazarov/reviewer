import React from "react";
import axios from "axios";
import moment from "moment";
import {
  Paper,
  Typography,
  Box,
  Button,
  Slide,
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAuth } from "../auth/auth";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function UserPage(props) {
  const auth = useAuth();
  const theme = useTheme();
  const [reviewDetails, setReviewDetails] = React.useState({
    title: "",
    category: "",
    content: "",
    memberId: auth.user?.memberId,
  });
  const [open, setOpen] = React.useState(false);
  const [reviews, setReviews] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateReview = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/createReview`,
        {
          title: reviewDetails.title,
          category: reviewDetails.category,
          content: reviewDetails.content,
          memberId: reviewDetails.memberId,
        },
        { headers: { "x-access-token": auth?.user?.token } }
      )
      .then((response) => {
        if (response.data.message) {
          console.log(response.data.message);
        } else {
          handleClose();
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  };

  React.useEffect(() => {
    const fetchReviews = async () => {
      const result = await axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/reviews`,
          {
            memberId: reviewDetails.memberId,
          },
          { headers: { "x-access-token": auth?.user?.token } }
        )
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
        setReviews(result);
      }
    };
    fetchReviews();
  }, [props.id]);

  return (
    <Paper elevation={3} sx={{ p: "30px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: "20px",
          columnGap: "10px",
        }}
      >
        <Avatar
          alt="avatar"
          src={auth.user.photo || `https://robohash.org/22`}
          variant="square"
          sx={{
            width: "100px",
            height: "100px",
            background: "black",
            borderRadius: "5px",
          }}
        />
        <Box>
          <Typography>
            {theme.locale === "uz" ? "Foydalanuvchining ismi" : "Username"}:{" "}
            {auth.user?.username}
          </Typography>
          <Typography>Email: {auth.user?.email}</Typography>
          <Typography>
            {theme.locale === "uz" ? "Ro'yxatdan o'tilgan sana" : "CreatedAt"}:{" "}
            {moment(auth.user?.createdAt).format("LLLL")}
          </Typography>
        </Box>
      </Box>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{ float: "right", mb: "10px" }}
        onClick={handleClickOpen}
      >
        {theme.locale === "uz" ? "Yangisini yaratish" : "Creata a review"}
      </Button>
      <Box>
        <TableContainer
          component={Paper}
          style={{ width: "100%", margin: "auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  {theme.locale === "uz" ? "Rasm" : "Picture"}
                </TableCell>
                <TableCell>
                  {theme.locale === "uz" ? "Sarlavha" : "Title"}
                </TableCell>
                <TableCell>
                  {theme.locale === "uz" ? "Matn" : "Content"}
                </TableCell>
                <TableCell>
                  {theme.locale === "uz" ? "Yaratildi" : "CreatedAt"}
                </TableCell>
                <TableCell>
                  {theme.locale === "uz" ? "O'zgartirildi" : "UpdatedAt"}
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reviews?.length > 0
                ? reviews.map((row) => (
                    <TableRow
                      key={row}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Avatar alt="avatar" src={row} variant="square" />
                      </TableCell>
                      <TableCell>
                        {row?.title.substring(0, 10) + "..."}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "150px" }}
                      >
                        {row.content.substring(0, 10) + "..."}
                      </TableCell>
                      <TableCell sx={{ width: "120px" }}>
                        {moment(row.createdAt).format("ll")}
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ width: "120px" }}
                      >
                        {row.updatedAt
                          ? moment(row.updatedAt).format("ll")
                          : ""}
                      </TableCell>
                      <TableCell sx={{ width: "240px" }}>
                        <Box
                          sx={{
                            display: "flex",
                            columnGap: "4px",

                            float: "right",
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"

                            // onClick={handleEdit}
                          >
                            {theme.locale === "uz" ? "Tahrirlash" : "Edit"}
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="info"
                            // onClick={handleUnBlock}
                          >
                            {theme.locale === "uz" ? "O'qish" : "Read"}
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            // onClick={handleDelete}
                          >
                            {theme.locale === "uz" ? "O'chirish" : "Delete"}
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))
                : ""}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Fill the review details below...
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => {
                handleCreateReview();
                // handleClose()
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            width: "60%",
            display: "flex",
            flexDirection: "column",
            m: "auto",
            rowGap: "30px",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            onChange={(e) =>
              setReviewDetails({ ...reviewDetails, title: e.target.value })
            }
          />
          <Box>
            <FormControl fullWidth>
              <Select
                sx={{ height: "30px" }}
                value={reviewDetails.category}
                onChange={(e) =>
                  setReviewDetails({
                    ...reviewDetails,
                    category: e.target.value,
                  })
                }
              >
                <MenuItem value={"movies"}>Movies</MenuItem>
                <MenuItem value={"games"}>Games</MenuItem>
                <MenuItem value={"books"}>Books</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TextField
            id="outlined-multiline-static"
            label="Content"
            multiline
            rows={14}
            onChange={(e) =>
              setReviewDetails({ ...reviewDetails, content: e.target.value })
            }
          />
        </Box>
      </Dialog>
    </Paper>
  );
}

export default UserPage;
