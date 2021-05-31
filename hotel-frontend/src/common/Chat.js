import React from "react";
import socketIo from "socket.io-client";

import { makeStyles } from "@material-ui/core/styles";

import { backendUrl } from "../app/env";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

export default function Chat() {
  const classes = useStyles();

  const [socket, setSocket] = React.useState(null);
  const [received, setReceived] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const handleSend = () => {
    socket.emit("chat message", message);
    setMessage("");
  };

  React.useEffect(() => {
    if (!socket) {
      let socket = socketIo(backendUrl);
      console.log("socket started");

      socket.on("error", (error) => {
        console.log("error");
      });

      socket.on("reconnect_attemp", () => {
        console.log("reconnect attemp");
      });

      socket.on("reconnect", () => {
        console.log("reconnect");
      });

      socket.on("reconnect_error", () => {
        console.log("reconnect error");
      });

      socket.on("disconnect", (reason) => {
        console.log("disconnect because:", reason);
      });

      // user define
      socket.on("server echo", (msg) => {
        setReceived((received) => [...received, msg]);
      });

      socket.on("server error", (msg) => {
        console.log("server error:", msg);
      });

      socket.on("server notification", (msg) => {
        console.log("server notification:", msg);
      });

      setSocket(socket);
    }
    return () => {
      if (socket) {
        socket.disconnect();
        console.log("socket stopped");
        setSocket(null);
      }
    };
  }, [socket]);

  return (
    <div className={classes.root}>
      <textarea
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      <div>
        <p>Received:</p>
        {received.map((msg, index) => {
          return <p key={index}>{msg}</p>;
        })}
      </div>
    </div>
  );
}
