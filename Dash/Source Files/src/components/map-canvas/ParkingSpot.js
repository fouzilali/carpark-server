import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

// TODO: LOD by size (how to get real size???)
// TODO: on hover details
export default function ParkingSpot({ x, y, w, h }) {
  return (
    <SvgLoader
      x={x}
      y={y}
      width={w}
      height={h}
      alt="example"
      path={require("../../images/shards-dashboards-logo.svg")}
    />
  );
}
