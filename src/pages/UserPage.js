import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useAuth } from "../auth/auth";

const images = [
  "https://www.dropbox.com/s/3rdzhzy76h9bmk8/reviewer.png?raw=1",
  "https://www.dropbox.com/s/ncyb0qbgt3dg67h/avengers.jpg?raw=1",
  "https://www.dropbox.com/s/2we1xngtno7004r/godofwar.jpg?raw=1",
  "https://www.dropbox.com/s/xr9eom0uq60v4ca/harrypotter.jpg?raw=1",
];

function UserPage() {
  const auth = useAuth();
  const theme = useTheme();
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
          <Typography>Username: {auth.user?.username}</Typography>
          <Typography>Email: {auth.user?.email}</Typography>
        </Box>
      </Box>
      <Button
        size="small"
        variant="contained"
        color="primary"
        sx={{float:'right', mb: '10px'}}
        // onClick={handleDelete}
      >
        Create a new review
      </Button>
      <Box>
        <TableContainer
          component={Paper}
          style={{ width: "100%", margin: "auto" }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>picture</TableCell>
                <TableCell align="center">title</TableCell>
                <TableCell align="center">content</TableCell>
                <TableCell align="center">createdAt</TableCell>
                <TableCell align="center">updatedAt</TableCell>
                <TableCell align="center">actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {images.length > 0
                ? images.map((row) => (
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
                      <TableCell>{row.username}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.email}
                      </TableCell>
                      <TableCell>{row.createdAt}</TableCell>
                      <TableCell component="th" scope="row">
                        {row.updatedAt}
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            columnGap: "4px",
                            width: "100px",
                          }}
                        >
                          <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            sx={{}}
                            // onClick={handleEdit}
                          >
                            Edit
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="info"
                            // onClick={handleUnBlock}
                          >
                            Read
                          </Button>
                          <Button
                            size="small"
                            variant="contained"
                            color="error"
                            // onClick={handleDelete}
                          >
                            Delete
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
    </Paper>
  );
}

export default UserPage;
