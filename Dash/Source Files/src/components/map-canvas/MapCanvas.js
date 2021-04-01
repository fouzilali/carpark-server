import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { MapInteractionCSS } from "react-map-interaction";
import ParkingSpot from "./ParkingSpot";

const example = require("./example-spots.json");
const exdata = require("./example-data.json");

export default function MapCanvas() {
  return (
    <MapInteractionCSS>
      <svg width="600px" height="600px">
        <SvgLoader
          width="100%"
          height="100%"
          path={require("../../images/LG5.svg")}
        >
          {/* {(() => {
          let proxies = [];
          for (let i = 0; i < 1000; i++) {
            const [fill, setFill] = useState("none");
            proxies.push(
              <SvgProxy
                selector={`path:nth-of-type(${i})`}
                onElementSelected={nodes => {
                  console.log("Event: element selected", nodes);
                }}
                onMouseEnter={() => setFill("blue")}
                onMouseLeave={() => setFill("none")}
                fill={fill}
              ></SvgProxy>
            );
          }
          return proxies;
        })()} */}

          {/* <SvgProxy
          selector="path"
          onElementSelected={nodes => {
            console.log("Event: element selected", nodes);
            setFills(
              nodes.map(node => {
                console.log(node.fill);
                return node.fill;
              })
            );
          }}
          onMouseEnter={interact}
        ></SvgProxy> */}
        </SvgLoader>
        {example.spots.map((spot, i) => (
          <ParkingSpot
            key={i}
            x={spot.xywh[0] * 100}
            y={spot.xywh[1] * 100}
            w={spot.xywh[2] * 100}
            h={spot.xywh[3] * 100}
            lp={exdata[spot.id].lp}
          ></ParkingSpot>
        ))}
      </svg>
    </MapInteractionCSS>
  );
}
