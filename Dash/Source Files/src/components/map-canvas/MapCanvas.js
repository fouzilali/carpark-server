import { SvgLoader, SvgProxy } from "react-svgmt";
import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { MapInteraction } from "react-map-interaction";
import ParkingSpot from "./ParkingSpot";
import axios from "axios";
import hostname from "../../hostname";
import mapdata from "./mapdata";
import { randChoose, randomLP } from "./mapdata";

const MapInteractionCSS = props => {
  return (
    <MapInteraction {...props}>
      {({ translation, scale }) => {
        // Translate first and then scale.  Otherwise, the scale would affect the translation.
        scale = scale * scale;
        const transform = `translate(${translation.x}px, ${translation.y}px) scale(${scale})`;
        // props.setScale(scale);
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

const sortSpots = arr => {
  arr.sort((a, b) => {
    if (!b.mapXY) {
      return 1;
    }
    if (a.mapXY.x === b.mapXY.x) {
      return b.mapXY.y - a.mapXY.y;
    } else {
      return b.mapXY.x - a.mapXY.x;
    }
  });
};

export default function MapCanvas() {
  // const spots = example.spots;
  const [spots, setSpots] = useState(
    (() => {
      sortSpots(mapdata.array);
      return mapdata;
    })()
  );
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`http://${hostname}:12000/setup/allSpots`);
      sortSpots(result.data);
      setSpots({ array: result.data });
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    // JUST FOR TESTING
    // setInterval(() => {
    //   const spot = randChoose(spots.array);
    //   spot.lpNumber = spot.lpNumber ? "" : randomLP();
    //   const data = {
    //     array: spots.array
    //   };
    //   setSpots(data); // force update
    // }, 1000);
    // const demo = setInterval(() => {
    //   spots.array.find(spot => spot.spotID === "PS25").lpNumber = "SN7319";
    //   const data = {
    //     array: spots.array
    //   };
    //   setSpots(data); // force update
    //   clearInterval(demo);

    //   const interval2 = setInterval(() => {
    //     spots.array.find(spot => spot.spotID === "PS25").lpNumber = "";
    //     const data = {
    //       array: spots.array
    //     };
    //     setSpots(data); // force update
    //     clearInterval(interval2);
    //   }, 10000);
    // }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <MapInteractionCSS setScale={setScale} maxScale={10000} minScale={1}>
      {/* <svg width="100%" height="100%"> */}
      <svg width="1000px" height="898px">
        <SvgLoader
          width="1000px"
          height="898px"
          path={require("../../images/LG5.svg")}
        ></SvgLoader>
        {(() => {
          console.log("rerender");
          return spots.array.map((spot, i) => {
            if (!spot) {
              return null;
            }
            const mapXY = spot.mapXY || { x: i, y: i };
            return (
              <ParkingSpot
                key={i}
                x={mapXY.x}
                y={mapXY.y}
                scale={scale}
                // scale={1}
                id={spot.spotID}
                spot={spot}
              ></ParkingSpot>
            );
          });
        })()}
      </svg>
    </MapInteractionCSS>
  );
}
