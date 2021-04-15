import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/BlogPosts";
import CameraSetup from "./views/CameraSetup";
import Operations from "./views/Operations";
import ParkingSpotSetup from "./views/ParkingSpotSetup";
import DemoPage from "./views/DemoPage";
import MapCanvas from "./components/map-canvas/MapCanvas.js";
import CameraSetup2 from "./views/CameraSetup2.js";
import MapSetup from "./views/MapSetup.js"

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/Operations" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/cameraSetup",
    layout: DefaultLayout,
    component: CameraSetup
  },

  {
    path: "/cameraSetup2",
    layout: DefaultLayout,
    component: CameraSetup2
  },

  {
    path: "/Operations",
    layout: DefaultLayout,
    component: Operations
  },
  {
    path: "/MapSetup",
    layout: DefaultLayout,
    component: MapSetup
  },
  {
    path: "/DemoPage",
    layout: DefaultLayout,
    component: DemoPage
  },
  {
    path: "/ParkingSpotSetup",
    layout: DefaultLayout,
    component: ParkingSpotSetup
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
  { path: "/parking-map", layout: DefaultLayout, component: MapCanvas }
];
