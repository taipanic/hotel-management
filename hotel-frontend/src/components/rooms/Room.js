import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import CustomTable from "../../common/Table";
import { backendUrl } from "../../common/env";

const channelsUrl = backendUrl + "/channels";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",

    flexDirection: "column",
    padding: theme.spacing(1),
    alignItems: "center",
    position: "relative",
  },
}));

export default function Room() {
  const classes = useStyles();

  const [rows, setRows] = React.useState([]);

  const { roomId } = useParams();

  React.useEffect(() => {
    axios
      .get(channelsUrl, {
        params: {
          refRoom: roomId,
        },
      })
      .then((response) => {
        console.log(response.data);
        setRows(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });
  }, [roomId]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        <Paper>
          <CustomTable
            rows={rows}
            selectedKey={[
              "name",
              "localId",
              "command",
              "timeseries",
              "valueType",
            ]}
            headText={[
              "Name",
              "Local Id",
              "Accept Command?",
              "Is timeseries?",
              "Value Type",
            ]}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
}
