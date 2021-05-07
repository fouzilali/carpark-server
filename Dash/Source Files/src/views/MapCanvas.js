import { SvgLoader } from "react-svgmt";
import PageTitle from "../components/common/PageTitle";
import { Container, Row, Col } from "shards-react";
import React, { useState, useEffect } from "react";
import { MapInteraction } from "react-map-interaction";
import ParkingSpot from "../components/map-canvas/ParkingSpot";
import axios from "axios";
var url = require('../url');

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
    if (b.mapXY && a.mapXY) {
      if (a.mapXY.x === b.mapXY.x) {
        return b.mapXY.y - a.mapXY.y;
      } else {
        return b.mapXY.x - a.mapXY.x;
      }
    } else {
      return (b.mapXY ? 1 : 0) - (a.mapXY ? 1 : 0);
    }
    //  else if (b.mapXY) {
    //   return 1;
    // } else if (b.mapXY) {
    //   return -1;
    // } else {
    //   return 0;
    // }
  });
};

export default function MapCanvas({ filename }) {
  function isEmpty(str) {
    return !str || str.length === 0;
  }
  if (isEmpty(filename)) {
    filename = "LG5";
  }
  // const spots = example.spots;
  const [spots, setSpots] = useState({ array: [] });
  const [scale, setScale] = useState(1);
  const [svg, setSVG] = useState({ xml: "" });
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(url+"/setup/allSpots");
      sortSpots(result.data);
      setSpots({ array: result.data });
    };

    const interval = setInterval(() => {
      fetchData();
    }, 1000);

    axios
      .get(url+"/setup/getCameraImage", { params: { filename: filename } })
      .then(res => setSVG({ xml: res.data }));

    return () => {
      clearInterval(interval);
    };
  }, []);

  console.log(svg.xml);

  return (
    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle sm="4" title="Car Park Map" className="text-sm-left" />
      </Row>
      <Row>
        <Col>
          {/* <Card small className="mb-4">
            <CardHeader className="border-bottom"></CardHeader>
            <CardBody className="p-0 pb-3"> */}
          <center>
            <MapInteractionCSS
              setScale={setScale}
              maxScale={10000}
              minScale={1}
            >
              <svg width="1000px" height="898px">
                <SvgLoader
                  width="1000px"
                  height="898px"
                  svgXML={svg.xml}
                  // path={require("../images/LG5.svg")}
                ></SvgLoader>
                {(() => {
                  return spots.array.map((spot, i) => {
                    if (!spot) {
                      return null;
                    }
                    const mapXY = spot.mapXY || { x: i * 10, y: i * 10 };
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
          </center>
          {/* </CardBody>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
}
