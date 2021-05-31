import React from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
// import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
// import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// import { sizing } from "@material-ui/system";
import Link from "@material-ui/core/Link";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import appStore from "../images/app-store.svg";
import googlePlay from "../images/google-play.svg";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(1),
  },
}));

export default function WelcomeScreen({
  IDMURL,
  updateToken,
  updateIsLoggedIn,
}) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [remembered, setRemembered] = React.useState(false);
  const [notARobot, setNotARobot] = React.useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRememberedChange = (e) => {
    setRemembered(e.target.checked);
  };

  const handleNotARobotChange = (e) => {
    setNotARobot(e.target.checked);
  };

  const handleForgotClick = (e) => {
    e.preventDefault();
  };

  const handleSubmitClick = (e) => {
    axios
      .post(IDMURL + "/v1/auth/tokens", {
        name: username,
        password: password,
      })
      .then((response) => {
        console.log("Logged in");
        const data = response.data;
        if (data.status === "succeed") {
          updateIsLoggedIn(true);
          updateToken(data.token);
          history.push("/home");
        } else {
          console.log("wrong password");
          // setNotification("Wrong name or password");
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("wrong password");
        // setNotification(error.message);
      });
  };

  const history = useHistory();
  const classes = useStyles();

  return (
    <Container fixed maxWidth="md" style={{ height: "100vh" }}>
      <Box display="flex" flexDirection="column" style={{ height: "100%" }}>
        <Box>
          <Typography variant="h3" gutterBottom>
            Welcome to the Palma Monitoring Platform
          </Typography>
        </Box>
        <Box flexGrow={1}>
          <Grid
            className={classes.root}
            spacing={1}
            container
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            <Grid item xs={8}>
              <Box display="flex" flexDirection="column">
                <Box bgcolor="text.secondary" style={{ height: 150 }}>
                  <h3>POWERING</h3>
                  <h3>YOUR LIFE!</h3>
                </Box>
                <Box>
                  <form noValidate autoComplete="off">
                    <TextField
                      id="username"
                      label="User Name"
                      placeholder="User Name / Email"
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                      }}
                      value={username}
                      onChange={handleUsernameChange}
                    />
                    <TextField
                      id="password"
                      label="Password"
                      placeholder="Password"
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                        required: true,
                      }}
                      value={password}
                      type="password"
                      onChange={handlePasswordChange}
                    />
                    <FormControl>
                      <FormGroup>
                        <FormControlLabel
                          label="I'm not a robot"
                          control={<Checkbox color="primary" />}
                          checked={notARobot}
                          onChange={handleNotARobotChange}
                        />
                        <Box display="flex">
                          <Box>
                            <Button
                              onClick={handleSubmitClick}
                              variant="contained"
                              disabled={notARobot ? false : true}
                            >
                              Login
                            </Button>
                          </Box>
                          <Box>
                            <FormControlLabel
                              label="Remember me"
                              control={<Checkbox color="primary" />}
                              checked={remembered}
                              onChange={handleRememberedChange}
                            />
                          </Box>
                        </Box>
                      </FormGroup>
                      <Link href="#" onClick={handleForgotClick}>
                        Forgot your password?
                      </Link>
                    </FormControl>
                  </form>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                display="flex"
                flexDirection="column"
                style={{ height: 150 }}
              >
                <Box bgcolor="text.secondary">
                  <Link href="#" onClick={(event) => event.preventDefault()}>
                    <img
                      src={appStore}
                      alt="App Store"
                      style={{ height: 75 }}
                    />
                  </Link>
                </Box>
                <Box bgcolor="text.secondary">
                  <Link href="#" onClick={(event) => event.preventDefault()}>
                    <img
                      src={googlePlay}
                      alt="Google Play"
                      style={{ height: 75 }}
                    />
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
