import React from "react";

import {
  Route,
  Switch,
  useRouteMatch,
  Link as RouterLink,
} from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Details from "./Details";
import Rooms from "./../rooms/Rooms";
import Dashboard from "./../dashboard/Dashboard";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  navContainer: {
    display: "flex",
  },
  navButton: {
    flexGrow: 1,
  },
}));

export default function Site() {
  const classes = useStyles();
  const match = useRouteMatch();

  const [currentTab, setCurrentTab] = React.useState(0);
  function handleChangeTab(e, newValue) {
    setCurrentTab(newValue);
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div>
          <AppBar position="static" elevation={0}>
            <Tabs value={currentTab} onChange={handleChangeTab} centered>
              <Tab
                label="Details"
                component={RouterLink}
                to={`${match.url}/details`}
              />
              <Tab
                label="Rooms"
                component={RouterLink}
                to={`${match.url}/rooms`}
              />
              <Tab
                label="Dashboard"
                component={RouterLink}
                to={`${match.url}/dashboard`}
              />
            </Tabs>
          </AppBar>
        </div>

        <Box flexGrow={1} display="flex" overflow="auto">
          <Switch>
            <Route path={`${match.path}/details`} children={<Details />} />
            <Route path={`${match.path}/rooms`} children={<Rooms />} />
            <Route path={`${match.path}/dashboard`} children={<Dashboard />} />
            <Route path={match.path} children={<Details />} />
          </Switch>
        </Box>
      </div>
    </React.Fragment>
  );
}
