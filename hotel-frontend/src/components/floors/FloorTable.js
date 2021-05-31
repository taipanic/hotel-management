import { backendUrl } from "../../common/env";

import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import Fab from "@material-ui/core/Fab";

import AddIcon from "@material-ui/icons/Add";

import CustomDialog from "../../common/Dialog";
import CustomTable from "../../common/Table";

const floorsUrl = backendUrl + "/floors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",

    flexDirection: "column",
    padding: theme.spacing(1),
    alignItems: "center",
    position: "relative",
  },

  fabButton: {
    position: "absolute",
    right: theme.spacing(4),
    bottom: theme.spacing(4),
  },
}));

export default function FloorTable() {
  const classes = useStyles();

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(floorsUrl)
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });
  }, []);

  const [name, setName] = React.useState("");

  const [openCreateFloor, setOpenCreateFloor] = React.useState(false);
  const handleApplyCreateFloor = () => {
    const newFloor = {
      name,
    };

    axios
      .post(floorsUrl, newFloor)
      .then((response) => {
        setRows((rows) => [...rows, response.data]);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });

    setOpenCreateFloor(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper>
          <CustomTable
            rows={rows}
            selectedKey={["name"]}
            headText={["Name"]}
            navigate
            navigateParam="id"
          />
        </Paper>

        <CustomDialog
          dialogTitle="Create New Floor"
          open={openCreateFloor}
          onApply={handleApplyCreateFloor}
          onCancel={() => setOpenCreateFloor(false)}
        >
          <form noValidate autoComplete="off">
            <TextField
              label="Floor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </CustomDialog>

        <Fab
          className={classes.fabButton}
          color="primary"
          onClick={() => setOpenCreateFloor(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
}
