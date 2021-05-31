import { backendUrl } from "../common/env";

import React from "react";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const mqttUrl = backendUrl + "/mqtt";

export default function MqttTest() {
  const classes = useStyles();

  const [topic, setTopic] = React.useState("provision");
  const [message, setMessage] = React.useState("");
  const [cursor, setCursor] = React.useState(0);

  const textAreaRef = React.useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setMessage(
        message.slice(0, selectionStart) + "  " + message.slice(selectionEnd)
      );
      setCursor(selectionStart + 2);
    }
  };
  const handleTextAreaChange = (e) => {
    const { selectionStart } = e.target;
    setMessage(e.target.value);
    setCursor(selectionStart);
  };
  React.useEffect(() => {
    textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = cursor;
  });

  const handlePublish = () => {
    axios
      .post(mqttUrl, {
        topic: topic,
        message: message,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
        if (error.response) console.log(error.response.data);
      });
  };

  return (
    <div className={classes.root}>
      <div>Topic</div>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <div>Message</div>
      <textarea
        rows="16"
        cols="64"
        ref={textAreaRef}
        value={message}
        onChange={handleTextAreaChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handlePublish}>Publish</button>
    </div>
  );
}
