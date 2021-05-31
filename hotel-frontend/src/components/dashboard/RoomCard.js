import React from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";

import { backendUrl } from "./../common/env";
import CustomDialog from "./../common/Dialog";

const channelsUrl = backendUrl + "/channels";

export default function RoomCard({ name, roomId }) {
  const [channels, setChannels] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(channelsUrl, {
        params: {
          refGateway: roomId,
        },
      })
      .then((response) => {
        setChannels(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });
  }, [roomId]);

  const [aTemp, setATemp] = React.useState(20);
  const [aFan, setAFan] = React.useState(1);
  const [aState, setAState] = React.useState(true);

  const [openManageRoom, setOpenManageRoom] = React.useState(false);
  const handleApplyManageRoom = () => {
    const data = channels.map((channel, index) => {
      if (channel.name === "state") {
        return {
          i: channel.localId,
          c: "set",
          v: aState,
        };
      } else if (channel.name === "temperature") {
        return { i: channel.localId, c: "set", v: aTemp };
      } else if (channel.name === "fan") {
        return {
          i: channel.localId,
          c: "set",
          v: aFan,
        };
      }
    });

    const command = {
      refGateway: roomId,
      data,
    };

    axios
      .post(channelsUrl, command)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });

    setOpenManageRoom(false);
  };

  return (
    <React.Fragment>
      <div style={{ border: "solid red 1px" }}>
        <div>{name}</div>
        {channels.map((channel, index) => (
          <div key={index}>
            <div>
              {channel.localId} {channel.name} {channel.v}
            </div>
            {channel.v ? <div>v</div> : null}
          </div>
        ))}
        <button onClick={() => setOpenManageRoom(true)}>Manage</button>

        <CustomDialog
          dialogTitle="Manage Room"
          open={openManageRoom}
          onApply={handleApplyManageRoom}
          onCancel={() => setOpenManageRoom(false)}
        >
          <form noValidate autoComplete="off">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                label="Temperature"
                value={aTemp}
                select
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => setATemp(e.target.value)}
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
                <option value={30}>30</option>
              </TextField>
              <TextField
                label="Fan Speed"
                value={aFan}
                select
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => setAFan(e.target.value)}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </TextField>
              <TextField
                label="AirCondit State"
                value={aState}
                select
                SelectProps={{
                  native: true,
                }}
                onChange={(e) => setAState(e.target.value)}
              >
                <option value={true}>On</option>
                <option value={false}>Off</option>
              </TextField>
            </div>
          </form>
        </CustomDialog>
      </div>
    </React.Fragment>
  );
}
