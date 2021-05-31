import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";

import Box from "@material-ui/core/Box";

import Floor from "./Floor";
import FloorTable from "./FloorTable";

export default function Floors() {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Box flexGrow={1} display="flex">
        <Switch>
          <Route path={`${match.path}/:floorId`} children={<Floor />} />
          <Route path={match.path} children={<FloorTable />} />
        </Switch>
      </Box>
    </React.Fragment>
  );
}
