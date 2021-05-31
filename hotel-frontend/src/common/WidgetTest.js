import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import ConfigurableWidget from "../widgets/ConfigurableWidget";
import { LandscapeModule, PortraitModule } from "../widgets/ModuleWidget";
import InverterWidget from "../widgets/InverterWidget";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function WidgetTest() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ConfigurableWidget />
      <LandscapeModule />
      <PortraitModule />
      <InverterWidget />
    </div>
  );
}
