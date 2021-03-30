import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { MapInteractionCSS } from "react-map-interaction";
import ParkingSpot from "./ParkingSpot";

const example = require("./example-spots.json");

export default function MapCanvas() {
  const [state, setState] = useState(true);
  return (
    <MapInteractionCSS>
      <svg width="100%" height="800px">
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
            w={100}
            h={state ? 120 : 80}
            x={0}
            y={spot * 100}
            onMouseEnter={() => setState(true)}
            onMouseLeave={() => setState(false)}
          ></ParkingSpot>
        ))}
      </svg>
    </MapInteractionCSS>
  );
}
