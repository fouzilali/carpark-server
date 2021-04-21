import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { SizeMe, withSize } from "react-sizeme";
import axios from "axios";
import useResizeObserver from "@react-hook/resize-observer";

// TODO: LOD by size (how to get real size???)
// TODO: on hover details
function ParkingSpot({ x, y, id, scale, spot }) {
  function isEmpty(str) {
    return !str || str.length === 0;
  }
  const vacant = isEmpty(spot.lpNumber);
  const iconBlue = "#007BFF";
  const dim = 7;
  const strokeWidth = Math.max(dim / scale / 2, 2);

  const [hover, setHover] = useState(false);

  const FullDetails = ({ wid, hgt }) => {
    const Txt = ({ line, text }) => {
      const fh = Math.max(wid, hgt) / 6;
      return (
        <text
          dominantBaseline="hanging"
          x={x + strokeWidth * 2}
          y={y + strokeWidth * 2 + line * fh}
          width={wid}
          height={hgt}
          fontSize={fh}
        >
          {text}
        </text>
      );
    };
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={wid ? wid : dim}
          height={hgt ? hgt : dim}
          stroke={iconBlue}
          fill="white"
          strokeWidth={strokeWidth}
          rx={strokeWidth / 2}
          ry={strokeWidth / 2}
        ></rect>
        <Txt text={!vacant ? spot.lpNumber : "VACANT"} line={0}></Txt>
        <Txt text={spot.cameraID} line={1}></Txt>
        <Txt text={spot.spotID} line={2}></Txt>
        {/* <Txt text={!vacant ? spot.lpNumber : "VACANT"} line={2}></Txt> */}
        {/* <Txt text={!vacant ? spot.lpNumber : "VACANT"} line={3}></Txt> */}
      </g>
    );
  };

  const icon = (
    <circle
      cx={x}
      cy={y}
      r={dim}
      stroke={iconBlue}
      fill={vacant ? "green" : "red"}
      strokeWidth={strokeWidth}
    ></circle>
  );
  return (
    <svg
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      width={1000}
      height={1000}
      x={0}
      y={0}
    >
      {icon}
      {hover ? (
        <FullDetails wid={180 / scale} hgt={100 / scale}></FullDetails>
      ) : null}
    </svg>
  );
}

export default ParkingSpot;
// export default withSize()(ParkingSpot);
