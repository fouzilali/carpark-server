import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { SizeMe, withSize } from "react-sizeme";

// Just for testing
const logoA = require("../../images/shards-dashboards-logo.svg");
const logoB = require("../../images/shards-dashboards-logo-danger.svg");

// TODO: LOD by size (how to get real size???)
// TODO: on hover details
function ParkingSpot({ x, y, w, h, onMouseEnter, onMouseLeave }) {
  //   console.log(`dims is ${size.height} x ${size.width}`);
  const svg =
    h > 100 ? (
      <SvgLoader x={x} y={y} width={w} height={h} alt="example" path={logoA} />
    ) : (
      <SvgLoader x={x} y={y} width={w} height={h} alt="example" path={logoB} />
    );

  return (
    <svg onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {svg}
    </svg>
  );
}

export default ParkingSpot;
// export default withSize()(ParkingSpot);
