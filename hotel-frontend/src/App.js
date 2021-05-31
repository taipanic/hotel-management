import React from "react";

import {
  BrowserRouter as Router,
  // Link,
  Switch,
  Route,
  Redirect,
  // useRouteMatch,
} from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import LiveHelpIcon from "@material-ui/icons/LiveHelp";

import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import ListItemLink from "./common/ListItemLink";
import Home from "./components/Home";
import Floors from "./components/floors/Floors";
import MiniMqtt from "./components/MiniMqtt";
import Test from "./components/test/Test";

// Color imports
import grey from "@material-ui/core/colors/grey";
import indigo from "@material-ui/core/colors/indigo";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    display: "flex",
  },

  header: {
    width: `calc(100% - 76px)`,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

  nav: {
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  main: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },

  toolbarPadding: theme.mixins.toolbar,

  workspace: {
    flexGrow: 1,
    display: "flex",
    overflow: "auto",
    backgroundColor: grey[200],
  },

  navBarToggleButton: {
    ...theme.mixins.toolbar,
    display: "flex",
    paddingLeft: theme.spacing(3),
    position: "fixed",
    backgroundColor: indigo[500],
    color: "white",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },

  drawerPaper: {
    width: drawerWidth,
    backgroundColor: indigo[500],
    color: "white",
  },
}));

function NavBar({ open, onNavToggle }) {
  const classes = useStyles();

  const drawer = (
    <div>
      <Box
        className={classes.toolbarPadding}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="h3">HOTEL</Typography>
      </Box>

      <Divider />
      <List onClick={onNavToggle(false)}>
        <ListItemLink icon={<MenuIcon />} text="Home" to="/home" />
        {/* <ListItemLink icon={<MenuIcon />} text="Dashboard" to="/dashboard" /> */}
        <ListItemLink icon={<MenuIcon />} text="Floors" to="/floors" />
        <ListItemLink icon={<MenuIcon />} text="MiniMqtt" to="/minimqtt" />
        <ListItemLink icon={<MenuIcon />} text="Test" to="/test" />
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <nav className={classes.nav}>
        <Drawer
          variant="temporary"
          open={open}
          onClose={onNavToggle(false)}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>

        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </React.Fragment>
  );
}

function NavBarToggleButton({ onNavToggle }) {
  const classes = useStyles();

  return (
    <div className={classes.navBarToggleButton}>
      <IconButton
        color="inherit"
        edge="start"
        onClick={onNavToggle(true)}
        className={classes.menuButton}
      >
        <MenuIcon />
      </IconButton>
    </div>
  );
}

function Menu() {
  const [navOpen, setNavOpen] = React.useState(false);
  const onNavToggle = (open) => () => {
    setNavOpen(open);
  };
  return (
    <React.Fragment>
      <NavBarToggleButton onNavToggle={onNavToggle} />
      <NavBar open={navOpen} onNavToggle={onNavToggle} />
    </React.Fragment>
  );
}

function Header() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar className={classes.header} position="fixed" elevation={0}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Hotel management
          </Typography>

          <Box flexGrow={1} />

          <IconButton color="inherit">
            <Badge badgeContent={1} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <IconButton color="inherit">
            <LiveHelpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

function Main() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <main className={classes.main}>
        <div className={classes.toolbarPadding} />

        <div className={classes.workspace}>
          <Switch>
            <Route path="/home" children={<Home />} />
            {/* <Route path="/dashboard" children={<Dashboard />} /> */}
            <Route path="/floors" children={<Floors />} />
            <Route path="/minimqtt" children={<MiniMqtt />} />
            <Route path="/test" children={<Test />} />

            <Route path="/">
              <Redirect to="/home" />
            </Route>
          </Switch>
        </div>
      </main>
    </React.Fragment>
  );
}

export default function App() {
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Menu />
        <Header />
        <Main />
      </div>
    </Router>
  );
}
