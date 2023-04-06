import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { Box, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/auth";

function Admin() {
    const [users, setUsers] = React.useState([]);
    const navigate = useNavigate();
    const auth = useAuth();
    const handleLogout = () => {
        auth.logout();
        navigate("/");
    };
    const handleFilter = (arr) => {
        const selected = arr.filter((user) => user.isChecked === true);
        if (selected.length === 0) {
            alert(
                "Please, check from the list before choosing one of the actions"
            );
        } else {
            return selected;
        }
    };

    const handleCheckbox = (e) => {
        const { name, checked } = e.target;

        if (name === "allSelect") {
            let tempUser = users.map((user) => {
                return { ...user, isChecked: checked };
            });

            setUsers(tempUser);
        } else {
            let tempUser = users.map((user) =>
                user.username === name ? { ...user, isChecked: checked } : user
            );

            setUsers(tempUser);
        }
    };

    const handleBlock = () => {
        const selected = handleFilter(users);
        selected?.forEach((user) => {
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/block`, {
                    username: user?.username,
                })
                .then((response) => {
                    if (response.data.affectedRows !== 0) {
                        fetchData();
                    } else {
                        console.log(response);
                    }
                });
        });
    };

    const handleUnBlock = () => {
        const selected = handleFilter(users);
        selected?.forEach((user) => {
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/unblock`, {
                    username: user?.username,
                })
                .then((response) => {
                    if (response.data.affectedRows !== 0) {
                        fetchData();
                    } else {
                        console.log(response);
                    }
                });
        });
    };

    const handleDelete = () => {
        const selected = handleFilter(users);
        selected?.forEach((user) => {
            axios
                .post(`${process.env.REACT_APP_BASE_URL}/delete`, {
                    username: user?.username,
                })
                .then((response) => {
                    if (response.data.affectedRows !== 0) {
                        fetchData();
                    } else {
                        console.log(response);
                    }
                });
        });
    };

    const fetchData = async () => {
        const result = await axios
            .get(`${process.env.REACT_APP_BASE_URL}/users`)
            .then((response) => {
                if (response.data.message) {
                    console.log(response.data.message);
                } else {
                    return response.data;
                }
            });
        if (result.length === 0) {
            navigate("/register");
        }
        setUsers(result);
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box sx={{ mt: "5%" }}>
            <Paper
                style={{
                    width: "70%",
                    margin: "auto",
                    marginBottom: "10px",
                    padding: "10px",
                    boxSizing: "border-box",
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    columnGap: "10px",
                }}
            >
                <Button
                    size="small"
                    variant="contained"
                    color="error"
                    onClick={handleBlock}
                >
                    Block
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="info"
                    onClick={handleUnBlock}
                >
                    Unblock
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={handleDelete}
                >
                    Delete
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    color="info"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Paper>
            <TableContainer
                component={Paper}
                style={{ width: "70%", margin: "auto" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ background: "#E8F8FD" }}>
                        <TableRow>
                            <TableCell>
                                {users.length > 0 ? (
                                    <Checkbox
                                        name="allSelect"
                                        checked={
                                            !users.some(
                                                (user) =>
                                                    user?.isChecked !== true
                                            )
                                        }
                                        onChange={handleCheckbox}
                                    />
                                ) : (
                                    <Checkbox />
                                )}
                            </TableCell>
                            <TableCell>id</TableCell>
                            <TableCell>username</TableCell>
                            <TableCell>e-mail</TableCell>
                            <TableCell>last login time</TableCell>
                            <TableCell>registration time</TableCell>
                            <TableCell>status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0
                            ? users.map((row) => (
                                  <TableRow
                                      key={row.ID}
                                      sx={{
                                          "&:last-child td, &:last-child th": {
                                              border: 0,
                                          },
                                      }}
                                  >
                                      <TableCell>
                                          <Checkbox
                                              name={row.username}
                                              checked={row?.isChecked || false}
                                              onChange={handleCheckbox}
                                          />
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                          {row.ID}
                                      </TableCell>
                                      <TableCell>{row.username}</TableCell>
                                      <TableCell component="th" scope="row">
                                          {row.email}
                                      </TableCell>
                                      <TableCell>{row.lastLoginTime}</TableCell>
                                      <TableCell component="th" scope="row">
                                          {row.registerTime}
                                      </TableCell>
                                      <TableCell>{row.status}</TableCell>
                                  </TableRow>
                              ))
                            : ""}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

export default Admin;
