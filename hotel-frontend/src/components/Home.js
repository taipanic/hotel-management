import React from "react";

import Box from "@material-ui/core/Box";

import ComingSoon from "../common/ComingSoon";

export default function Home() {
  return (
    <React.Fragment>
      <Box flexGrow={1} display="flex">
        <ComingSoon />
      </Box>
    </React.Fragment>
  );
}
