import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { SizeMe, withSize } from "react-sizeme";
import axios from "axios";
import useResizeObserver from "@react-hook/resize-observer";

// Just for testing
const logoA = require("../../images/shards-dashboards-logo.svg");
const logoB = require("../../images/shards-dashboards-logo-danger.svg");

const MINM_DETAILS = 0;
const SOME_DETAILS = 1;
const FULL_DETAILS = 2;

// TODO: LOD by size (how to get real size???)
// TODO: on hover details
function ParkingSpot({ x, y, w, h, id, scale, cacheSpot }) {
  const target = useRef(null);
  let spot;
  if (true) {
    spot = cacheSpot; // Update outside
  } else {
    // Update internally (dont do both)
    const [spot, setSpot] = useState(cacheSpot);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get(
          "http://localhost:12000/setup/getParkingSpot",
          { params: { spotID: id } }
        );
        console.log(`getParkingSpot(${id}) got`);
        console.log(result.data);
        setSpot(result.data);
      };
      fetchData();
    }, []);
  }
  const vacant = !spot.licensePlate;
  const dim = Math.max(w, h);
  // const dim = Math.min(w, h);
  const [lod, setLOD] = useState(
    dim * scale < 50
      ? MINM_DETAILS
      : dim * scale < 100
      ? SOME_DETAILS
      : FULL_DETAILS
  );

  switch (lod) {
    case MINM_DETAILS:
      if (w * scale > 100) {
        setLOD(SOME_DETAILS);
      }
      break;
    case SOME_DETAILS:
      if (w * scale > 200) {
        setLOD(FULL_DETAILS);
      } else if (w * scale < 90) {
        setLOD(MINM_DETAILS);
      }
      break;
    case FULL_DETAILS:
      if (w * scale < 180) {
        setLOD(SOME_DETAILS);
      }
      break;

    default:
      setLOD(SOME_DETAILS);
  }

  const rectBlue = "#007BFF";
  const strokeWidth = Math.max(dim / scale / 8, 2);

  const [hover, setHover] = useState(false);

  const BoundingRect = ({ fill, wid, hgt }) => {
    return (
      <rect
        x={strokeWidth}
        y={strokeWidth}
        width={wid ? wid : w}
        height={hgt ? hgt : h}
        stroke={rectBlue}
        fill={fill}
        strokeWidth={strokeWidth}
        rx={strokeWidth / 2}
        ry={strokeWidth / 2}
      ></rect>
    );
  };
  const FullDetails = ({ wid, hgt }) => {
    const Txt = ({ line, text }) => {
      const fh = Math.max(wid, hgt) / 6;
      return (
        <text
          dominantBaseline="hanging"
          x={strokeWidth * 2}
          y={strokeWidth * 2 + line * fh}
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
        <BoundingRect fill="white" wid={wid} hgt={hgt}></BoundingRect>
        <Txt text={!vacant ? spot.licensePlate : "VACANT"} line={0}></Txt>
        <Txt text={spot.spotID} line={1}></Txt>
        <Txt text={spot.cameraID} line={2}></Txt>
        {/* <Txt text={!vacant ? spot.licensePlate : "VACANT"} line={2}></Txt> */}
        {/* <Txt text={!vacant ? spot.licensePlate : "VACANT"} line={3}></Txt> */}
      </g>
    );
  };

  return (
    <svg
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      width={Math.max(300 / scale, 2 * w)}
      height={Math.max(300 / scale, 2 * h)}
      x={x}
      y={y}
      ref={target}
    >
      {(() => {
        switch (lod) {
          case MINM_DETAILS:
            return (
              <g>
                <BoundingRect fill={vacant ? "green" : "red"}></BoundingRect>
              </g>
            );

          case SOME_DETAILS:
            return (
              <g>
                <BoundingRect fill="white"></BoundingRect>
                <text
                  dominantBaseline="hanging"
                  x={strokeWidth * 2}
                  y={strokeWidth * 2}
                  width={w}
                  height={h}
                  fontSize={dim / 7}
                >
                  {!vacant ? spot.licensePlate : "VACANT"}
                </text>
              </g>
            );

          case FULL_DETAILS:
            return <FullDetails wid={w} hgt={h}></FullDetails>;

          default:
            return;
        }
      })()}
      {hover ? (
        <FullDetails wid={200 / scale} hgt={200 / scale}></FullDetails>
      ) : null}
    </svg>
  );
}

export default ParkingSpot;
// export default withSize()(ParkingSpot);
