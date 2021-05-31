import React from "react";

import Box from "@material-ui/core/Box";
import { PropsLogger, usePropsLogger } from "./Hooks";

export default function Demo1() {
  const [value, setValue] = React.useState("");
  function handleChange(e) {
    setValue(e.target.value);
  }

  const [value1, setValue1] = React.useState("");
  function handleChange1(e) {
    setValue1(e.target.value);
  }

  const Input1 = usePropsLogger("input");

  return (
    <React.Fragment>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Input1 value={value} onChange={handleChange} type="text" />

        <PropsLogger
          component="input"
          value={value1}
          onChange={handleChange1}
          type="text"
        />
      </Box>
    </React.Fragment>
  );
}
