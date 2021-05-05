import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Operations from "./views/Operations";
import ParkingSpotSetup from "./views/ParkingSpotSetup";
import MapCanvas from "./views/MapCanvas.js";
import CameraSetup2 from "./views/CameraSetup2.js";
import MapSetup from "./views/MapSetup.js";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/Operations" />
  },
  { path: "/cameraSetup2", layout: DefaultLayout, component: CameraSetup2 },
  { path: "/Operations", layout: DefaultLayout, component: Operations },
  { path: "/MapSetup", layout: DefaultLayout, component: MapSetup },
  {
    path: "/ParkingSpotSetup",
    layout: DefaultLayout,
    component: ParkingSpotSetup
  },
  { path: "/parking-map", layout: DefaultLayout, component: MapCanvas }
];
