import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMutationEffect
} from "react";
import { hot } from "react-hot-loader";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {
  TwoDimensionalImage,
  TwoDimensionalVideo
} from "react-annotation-tool";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import axios from "axios";

function TabPanel(props) {
  const { value, index, PSpotOptions, url, ...other } = props;
  const handleSubmit = r => {
    console.log(r.annotations[0].vertices);
    console.log(r);
    const scale = r.imageScaleFactor;
    r.annotations.map((annotation, index) => {
      var x1 = annotation.vertices[0].x / scale;
      var y1 = annotation.vertices[0].y / scale;
      const spot = {
        spotID: annotation.selectedOptions[1].value,
        mapXY: {
          x1: x1,
          y1: y1
        }
      };
      console.log(spot);
      try {
        const res = axios.put(
          "http://localhost:12000/setup/updateParkingSpot",
          spot
        );
      } catch (err) {
        console.log(err);
      }
    });
  };
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          <TwoDimensionalImage
            hasSkipButton
            onSkipClick={handleSubmit}
            isDynamicOptionsEnable={false}
            isLabelOn
            url={url}
            imageWidth={1000}
            options={PSpotOptions}
          />
        </div>
      )}
    </div>
  );
}

function renderAllTabHeads(allCams, a11yProps) {
  return allCams.map((cam, index) => {
    return (
      <Tab
        key={index}
        label={`REGION: ${cam.mapRegion}`}
        {...a11yProps(index)}
      />
    );
  });
}
// 'http://localhost:12000/setup/getCameraImage?filename=wallpaper2'
function renderAllTabs(allCams, value, dir) {
  return allCams.map((cam, index) => {
    console.log(cam.parkingSpots)
    return (
      <TabPanel
        key={index}
        value={value}
        index={index}
        PSpotOptions={cam.parkingSpots}
        url={require("../images/LG5.svg")}
        dir={dir}
      />
    );
  });
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
}));

const MapSetup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [allCams, setAllCams] = React.useState({
    array: [
      {
        mapRegion: "LG1",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "A1", children: [] },
            { id: "2", value: "A2", children: [] },
            { id: "3", value: "A3", children: [] },
            { id: "4", value: "A4", children: [] },
            { id: "5", value: "A5", children: [] },
            { id: "6", value: "B1", children: [] },
            { id: "7", value: "B2", children: [] },
            { id: "8", value: "B3", children: [] },
            { id: "9", value: "B4", children: [] },
            { id: "10", value: "B5", children: [] }
          ]
        }
      },
      {
        mapRegion: "LG2",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "A1", children: [] },
            { id: "2", value: "A2", children: [] },
            { id: "3", value: "A3", children: [] },
            { id: "4", value: "A4", children: [] },
            { id: "5", value: "A5", children: [] },
            { id: "6", value: "B1", children: [] },
            { id: "7", value: "B2", children: [] },
            { id: "8", value: "B3", children: [] },
            { id: "9", value: "B4", children: [] },
            { id: "10", value: "B5", children: [] }
          ]
        }
      },
      {
        mapRegion: "LG5",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "A1", children: [] },
            { id: "2", value: "A2", children: [] },
            { id: "3", value: "A3", children: [] },
            { id: "4", value: "A4", children: [] },
            { id: "5", value: "A5", children: [] },
            { id: "6", value: "B1", children: [] },
            { id: "7", value: "B2", children: [] },
            { id: "8", value: "B3", children: [] },
            { id: "9", value: "B4", children: [] },
            { id: "10", value: "B5", children: [] }
          ]
        }
      }
    ]
  });

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:12000/setup/getAllCameras");
      console.log(res.data);
      return [
        {
          mapRegion: "LG5",
          parkingSpots: {
            id: "1",
            value: "root",
            children: res.data
              .flatMap(cam =>
                cam.parkingSpots.map((spot, i) => {
                  return {
                    id: `0`,
                    value: spot,
                    children: []
                  };
                })
              )
              .map((c, i) => {
                c.id = `${i + 1}`;
                console.log(c);
                return c;
              })
          }
        }
      ];
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchData().then(data => setAllCams({ array: data }));
  }, []);

  useEffect(() => {
    console.log(allCams);
  }, [allCams]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  const previewNoticeList = [
    "Cells' body range.",
    "The time that cells <u>split</u>, <u>leave</u>, <u>obscured</u> and <u>show up</u> (if applicable)."
  ];
  const previewHeader =
    "Please scan the video and observe the following to help you complete the task:";
  const emptyCheckSubmissionWarningText =
    "Please annotate AND track one unmarked cell to complete this task.";
  const emptyCheckAnnotationItemWarningText =
    "Step 2: Please track the cell bound by this box";
  const emptyAnnotationReminderText =
    "Step 1: Click the button above to add a new box around a cell";

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {renderAllTabHeads(allCams.array, a11yProps)}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {renderAllTabs(allCams.array, value, theme.direction)}
      </SwipeableViews>
    </div>
  );
};

export default MapSetup;
