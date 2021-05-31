import React from "react";

import { Route, Switch, useRouteMatch } from "react-router-dom";

import Box from "@material-ui/core/Box";

import Room from "./Room";
import RoomTable from "./RoomTable";

export default function Rooms() {
  const match = useRouteMatch();

  return (
    <React.Fragment>
      <Box flexGrow={1} display="flex">
        <Switch>
          <Route path={`${match.path}/:roomId`} children={<Room />} />
          <Route path={match.path} children={<RoomTable />} />
        </Switch>
      </Box>
    </React.Fragment>
  );
}
