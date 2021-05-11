import React, { useEffect } from "react";
import { TwoDimensionalImage } from "react-annotation-tool";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import axios from "axios";
import MASTER_URL from "../url.js";


function TabPanel(props) {
  const { value, index, PSpotOptions, url, ...other } = props;
  const handleSubmit = r => {
    let data = [];
    const scale = r.imageScaleFactor;
    r.annotations.map((annotation, index) => {
      var x1 = annotation.vertices[0].x / scale;
      var y1 = annotation.vertices[0].y / scale;
      var x2 = annotation.vertices[1].x / scale;
      var y2 = annotation.vertices[1].y / scale;
      var x3 = annotation.vertices[2].x / scale;
      var y3 = annotation.vertices[2].y / scale;
      var x4 = annotation.vertices[3].x / scale;
      var y4 = annotation.vertices[3].y / scale;
      data.push({
        spotID: annotation.selectedOptions[1].value,
        boundingBox: {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          x3: x3,
          y3: y3,
          x4: x4,
          y4: y4
        }
      });
      return data;
    });
    console.log(data);
    data.forEach(spot => {
      try {
        console.log(spot)
        axios.put(MASTER_URL + "/setup/updateParkingSpot", spot);
      } catch (err) {}
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
            imageWidth={800}
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
        label={`CAMERA: ${cam.cameraID}`}
        {...a11yProps(index)}
      />
    );
  });
}
// 'http://localhost:12000/setup/getCameraImage?filename=wallpaper2'
function renderAllTabs(allCams, value, dir) {
  return allCams.map((cam, index) => {
    return (
      <TabPanel
        key={index}
        value={value}
        index={index}
        PSpotOptions={cam.parkingSpots}
        url={`${MASTER_URL}/setup/getCameraImage?filename=${cam.mac}`}
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

const ParkingSpotSetup = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [allCams, setAllCams] = React.useState({
    array: [
      {
        cameraID: "A1",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "A1", children: [] },
            { id: "2", value: "A2", children: [] },
            { id: "3", value: "A3", children: [] },
            { id: "4", value: "A4", children: [] },
            { id: "5", value: "A5", children: [] }
          ]
        }
      },
      {
        cameraID: "A2",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "B1", children: [] },
            { id: "2", value: "B2", children: [] },
            { id: "3", value: "B3", children: [] },
            { id: "4", value: "B4", children: [] },
            { id: "5", value: "B5", children: [] }
          ]
        }
      },
      {
        cameraID: "A3",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "C1", children: [] },
            { id: "2", value: "C2", children: [] },
            { id: "3", value: "C3", children: [] },
            { id: "4", value: "C4", children: [] },
            { id: "5", value: "C5", children: [] }
          ]
        }
      },
      {
        cameraID: "A4",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "D1", children: [] },
            { id: "2", value: "D2", children: [] },
            { id: "3", value: "D3", children: [] },
            { id: "4", value: "D4", children: [] },
            { id: "5", value: "D5", children: [] }
          ]
        }
      },
      {
        cameraID: "A5",
        parkingSpots: {
          id: "0",
          value: "root",
          children: [
            { id: "1", value: "E1", children: [] },
            { id: "2", value: "E2", children: [] },
            { id: "3", value: "E3", children: [] },
            { id: "4", value: "E4", children: [] },
            { id: "5", value: "E5", children: [] }
          ]
        }
      }
    ]
  });

  async function fetchData() {
    try {
      const res = await axios.get(MASTER_URL+"/setup/getAllCameras");
      let cams = [];
      for (var cam of res.data) {
        cams.push({
          cameraID: cam.cameraID,
          mac: cam.mac,
          parkingSpots: {
            id: "0",
            value: "root",
            children: cam.parkingSpots.map((spot, index) => {
              return {
                id: `${index + 1}`,
                value: spot,
                children: []
              };
            })
          }
        });
      }
      return cams;
    } catch (err) {}
  }

  useEffect(() => {
    fetchData().then(data => setAllCams({ array: data }));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

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

export default ParkingSpotSetup;
