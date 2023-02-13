import { Button, LinearProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import { Link, useHistory } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading, setloading] = useState("finished");
  const history = useHistory();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */
  const register = async (formData) => {
    const isValidInput = validateInput(formData);
    if (!isValidInput) {
      return false;
    }
    formData = { username, password };
    setloading("progress");
    await axios
      .post(`${config.endpoint}/auth/register`, formData)
      .then(function (response) {
        if (response.status === 201) {
          enqueueSnackbar("Registered successfully", { variant: "success" });
        }
        history.push("/login");
      })
      .catch(function (error) {
        error.response && error.response.status === 400
          ? enqueueSnackbar(error.response.data.message, { variant: "error" })
          : enqueueSnackbar(
              "Something went wrong. Check that the backend is running, reachable and returns valid JSON",
              { variant: "error" }
            );
      });
    setloading("finished");
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    data = { username, password, confirmpassword };

    if (username === "") {
      enqueueSnackbar("Username is a required field", {
        variant: "error",
      });
      return false;
    }
    if (password === "") {
      enqueueSnackbar("Password is a required field", {
        variant: "error",
      });
      return false;
    }

    if (username.length < 6) {
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: "error",
      });
      return false;
    }
    if (password.length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: "error",
      });
      return false;
    }
    if (password !== confirmpassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "error",
      });
      return false;
    }
    return true;
  };
  let regButton = <div></div>;
  if (loading === "progress") {
    regButton = <LinearProgress />;
  } else {
    regButton = (
      <Button
        className="button"
        variant="contained"
        type="submit"
        onClick={register}
      >
        Register Now
      </Button>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons={false} />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            value={username}
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e) => setusername(e.target.value)}
          />
          <TextField
            value={password}
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) => setpassword(e.target.value)}
          />
          <TextField
            value={confirmpassword}
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e) => setconfirmpassword(e.target.value)}
          />

          {regButton}

          <p className="secondary-action">
            Already have an account?{" "}
            <Link className="link" to="/login">
              Login here
            </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
