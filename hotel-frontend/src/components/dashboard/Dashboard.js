import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import socketIo from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

import { backendUrl } from "../../common/env";
import CustomDialog from "../../common/Dialog";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGroom: 1,
    display: "flex",
    flexDirection: "column",
  },
}));

const channelsUrl = backendUrl + "/channels";
const roomsUrl = backendUrl + "/rooms";

export default function Dashboard() {
  const classes = useStyles();
  const { floorId } = useParams();

  const [rooms, setRooms] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(roomsUrl, { params: { refFloor: floorId } })
      .then((response) => setRooms(response.data))
      .catch((error) => console.log(error.message));
  }, [floorId]);

  return (
    <React.Fragment>
      <div className={classes.root}>
        {rooms.map((room, index) => (
          <RoomWidget key={index} room={room} />
        ))}
      </div>
    </React.Fragment>
  );
}

function RoomWidget({ room }) {
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen((open) => !open);
  }

  return (
    <React.Fragment>
      <button onClick={handleClick}>{open ? "Hide" : "Show"}</button>
      {open ? <Room room={room} /> : null}
    </React.Fragment>
  );
}

/*

*/

function Room({ room }) {
  const { floorId } = useParams();

  // const [state, setState] = useState(true);
  // const [temp, setTemp] = useState(25);
  // const [fan, setFan] = useState("auto");
  // const [current, setCurrent] = useState(0);

  const [channels, setChannels] = React.useState([
    {
      name: "state",
      valueBoolean: true,
      valueType: "Boolean",
    },
    {
      name: "temp",
      valueNumber: 25,
      valueType: "Number",
    },
    {
      name: "fan",
      valueString: "auto",
      valueType: "String",
    },
    {
      name: "current",
      valueNumber: 0,
      valueType: "Number",
    },
  ]);

  // React.useEffect(() => {
  //   axios
  //     .get(channelsUrl, { params: { refRoom: room.id } })
  //     .then((response) => {
  //       console.log(response.data);
  //       setChannels(response.data);
  //     })
  //     .catch((error) => console.log(error.message));
  // }, [room]);

  // Websocket
  const [socket, setSocket] = React.useState(null);
  React.useEffect(() => {
    if (!socket) {
      let socket = socketIo(backendUrl);
      console.log("socket started");

      socket.on("error", (error) => {
        console.log("error:", error);
      });

      socket.on("reconnect_attemp", () => {
        console.log("reconnect attemp");
      });

      socket.on("reconnect", () => {
        console.log("reconnect");
        socket.emit("subscribe", JSON.stringify({ siteId: floorId }));
        console.log("subscription emitted");
      });

      socket.on("reconnect_error", () => {
        console.log("reconnect error");
      });

      socket.on("disconnect", (reason) => {
        console.log("disconnect because:", reason);
      });

      // user define

      socket.on("notify", (msg) => {
        console.log("notification:", msg);
      });

      socket.on("update", (msg) => {
        console.log("new updates");

        const updateDataArray = JSON.parse(msg);
        console.log(updateDataArray);
      });

      socket.emit("subscribe", JSON.stringify({ siteId: floorId }));
      console.log("subscription emitted");

      setSocket(socket);
    }
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("socket stopped");
        setSocket(null);
      }
    };
  }, [socket, floorId]);

  const [openRoomManage, setOpenRoomManage] = useState(false);

  const [newState, setNewState] = useState(true);
  const [newTemp, setNewTemp] = useState(25);
  const [newFan, setNewFan] = useState("auto");

  const applyRoomManage = () => {
    console.log(newState);

    const newCommand = {
      refRoom: room.id,
      channels: [
        {
          localId: "state",
          value: newState,
        },
        {
          localId: "temp",
          value: newTemp,
        },
        {
          localId: "fan",
          value: newFan,
        },
      ],
    };

    axios
      .post(backendUrl + "/command", newCommand)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.message));

    setOpenRoomManage(false);
  };

  // Return HTML element
  return (
    <React.Fragment>
      <div>{room.name.toUpperCase()}</div>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>value</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel, index) => (
            <tr key={index}>
              <td>{channel.name}</td>
              <td>
                {(channel.valueType === "String" &&
                  String(channel.valueString)) ||
                  (channel.valueType === "Number" &&
                    String(channel.valueNumber)) ||
                  (channel.valueType === "Boolean" &&
                    (channel.valueBoolean ? "On" : "Off")) ||
                  "Null"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setOpenRoomManage(true)}>Manage</button>
      <CustomDialog
        dialogTitle="Manage Room"
        open={openRoomManage}
        onCancel={() => setOpenRoomManage(false)}
        onApply={applyRoomManage}
      >
        <form noValidate autoComplete="off">
          <label>
            State:
            <select
              value={newState}
              onChange={(e) =>
                setNewState(e.target.value === "false" ? false : true)
              }
            >
              <option value={true}>On</option>
              <option value={false}>Off</option>
            </select>
          </label>

          <label>
            Temp:
            <select
              value={newTemp}
              onChange={(e) => setNewTemp(Number(e.target.value))}
            >
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
            </select>
          </label>
          <label>
            Fan:
            <select value={newFan} onChange={(e) => setNewFan(e.target.value)}>
              <option value="auto">Auto</option>
              <option value="1">Speed 1</option>
              <option value="2">Speed 2</option>
              <option value="3">Speed 3</option>
              <option value="4">Speed 4</option>
              <option value="5">Speed 5</option>
              <option value="quiete">Quiet</option>
            </select>
          </label>
        </form>
      </CustomDialog>
    </React.Fragment>
  );
}
