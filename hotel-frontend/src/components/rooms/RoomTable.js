import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import CustomDialog from "../../common/Dialog";
import CustomTable from "../../common/Table";
import { backendUrl } from "../../common/env";

const roomsUrl = backendUrl + "/rooms";

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

export default function RoomTable() {
  const classes = useStyles();

  const { floorId } = useParams();

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(roomsUrl, {
        params: {
          refFloor: floorId,
        },
      })
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });
  }, [floorId]);

  const [name, setName] = React.useState("");
  const [openCreateRoom, setOpenCreateRoom] = React.useState(false);
  const handleApplyCreateRoom = () => {
    const newRoom = {
      refFloor: floorId,
      name,
    };

    axios
      .post(roomsUrl, newRoom)
      .then((response) => {
        setRows((rows) => [...rows, response.data]);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });

    setOpenCreateRoom(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper>
          <CustomTable
            rows={rows}
            selectedKey={["apikey", "name"]}
            headText={["API Key", "Name"]}
            navigate
            navigateParam="id"
          />
        </Paper>

        <CustomDialog
          dialogTitle="Create New Room"
          open={openCreateRoom}
          onApply={handleApplyCreateRoom}
          onCancel={() => setOpenCreateRoom(false)}
        >
          <form noValidate autoComplete="off">
            <TextField
              label="Room Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </form>
        </CustomDialog>

        <Fab
          className={classes.fabButton}
          color="primary"
          onClick={() => setOpenCreateRoom(true)}
        >
          <AddIcon />
        </Fab>
      </div>
    </React.Fragment>
  );
}
