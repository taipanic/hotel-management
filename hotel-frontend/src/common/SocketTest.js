import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Chat from "./Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function SocketTest() {
  const classes = useStyles();

  const [openChat, setOpenChat] = React.useState(false);
  const handleToggleChat = () => {
    setOpenChat((openChat) => ~openChat);
  };

  return (
    <div className={classes.root}>
      <button onClick={handleToggleChat}>
        Turn Chat {openChat ? "Off" : "On"}
      </button>
      {openChat ? <Chat openChat={openChat} /> : null}
    </div>
  );
}
