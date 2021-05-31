import React from "react";

import Box from "@material-ui/core/Box";

export default function ComingSoon() {
  return (
    <React.Fragment>
      <Box
        flexGrow={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <div>Coming soon</div>
      </Box>
    </React.Fragment>
  );
}
