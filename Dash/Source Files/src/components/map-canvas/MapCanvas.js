import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { MapInteraction } from "react-map-interaction";
import ParkingSpot from "./ParkingSpot";
import axios from "axios";

const MapInteractionCSS = props => {
  return (
    <MapInteraction {...props}>
      {({ translation, scale }) => {
        // Translate first and then scale.  Otherwise, the scale would affect the translation.
        scale = scale * scale;
        const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
        props.setScale(scale);
        return (
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "relative", // for absolutely positioned children
              overflow: "hidden",
              touchAction: "none", // Not supported in Safari :(
              msTouchAction: "none",
              cursor: "all-scroll",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none"
            }}
          >
            <div
              style={{
                display: "inline-block", // size to content
                transform: transform,
                transformOrigin: "0 0 "
              }}
            >
              {props.children}
            </div>
          </div>
        );
      }}
    </MapInteraction>
  );
};

export default function MapCanvas() {
  // const spots = example.spots;
  const [spots, setSpots] = useState({ array: [] });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:12000/setup/allSpots");
      console.log(`allSpots got`);
      console.log(result);
      setSpots({ array: result.data });
      console.log(spots);
    };
    fetchData();
  }, []);
  const [scale, setScale] = useState(1);
  return (
    <MapInteractionCSS setScale={setScale} maxScale={10000} minScale={1}>
      {/* <svg width="100%" height="100%"> */}
      <svg width="1000px" height="1000px">
        <SvgLoader
          width="100%"
          // height="100%"
          // height="auto"
          // preserveAspectRatio={true}
          path={require("../../images/LG5.svg")}
        ></SvgLoader>
        {spots.array.map((spot, i) => {
          if (!spot) {
            return;
          }
          const x = i * 10;
          const xywh = spot.xywh || [x, x, 4, 2];
          return (
            <ParkingSpot
              key={i}
              x={xywh[0] * 10}
              y={xywh[1] * 10}
              w={xywh[2] * 10}
              h={xywh[3] * 10}
              scale={scale}
              id={spot.spotID}
              cacheSpot={spot}
            ></ParkingSpot>
          );
        })}
      </svg>
    </MapInteractionCSS>
  );
}
