import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import React from "react";
import "./Header.css";

const Header = (props) => {
  const user = localStorage.getItem("username");
  const isLoggedIn = user ? true : false;
  const history = useHistory();
  const handleLogout = (event) => {
    localStorage.clear();
    window.location.reload();
    history.push("/login");
  };
  let searchBox = <Box></Box>;

  if (props.hasHiddenAuthButtons) {
    searchBox = props.searchBox;
  }
  return (
    <Box className="header">
      <Box className="header-title">
        <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {searchBox}
      {!props.hasHiddenAuthButtons && (
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => history.push("/")}
        >
          Back to explore
        </Button>
      )}
      {props.hasHiddenAuthButtons && !isLoggedIn && (
        <Stack direction="row" spacing={2}>
          <Button variant="text" onClick={() => history.push("/login")}>
            Login
          </Button>
          <Button variant="contained" onClick={() => history.push("/register")}>
            Register
          </Button>
        </Stack>
      )}
      {props.hasHiddenAuthButtons && isLoggedIn && (
        <Stack direction="row" spacing={2}>
          <Avatar alt={user} src="avatar.png" />
          <p style={{ marginTop: "10px" }}>{user}</p>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Header;
