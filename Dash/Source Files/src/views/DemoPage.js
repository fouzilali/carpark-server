import React, { useState, useRef, useEffect, useLayoutEffect, useMutationEffect } from "react";
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
  const handleSubmit = (r) => {
    let data = [];
    r.annotations.map((annotation, index)=>{
      data.push({spotID: annotation.selectedOptions[1].value,
                 boundingBox: {
                        x1: annotation.vertices[0].x,
                        y1: annotation.vertices[0].y,
                        x2: annotation.vertices[1].x,
                        y2: annotation.vertices[1].y,
                        x3: annotation.vertices[2].x,
                        y3: annotation.vertices[2].y,
                        x4: annotation.vertices[3].x,
                        y4: annotation.vertices[3].y
                 }
      })
    });
    data.forEach( spot => {
      try{
        const res = axios.put('http://localhost:12000/setup/updateParkingSpot',spot);
      }
      catch (err){
        console.log(err)
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
    return <Tab key={index} label={`Camera: ${cam.cameraID}`} {...a11yProps(index)} />;
  });
}
// 'http://localhost:12000/setup/getCameraImage?filename=wallpaper2'
function renderAllTabs(allCams, value, dir) {
  return allCams.map((cam, index) => {
    // console.log(cam.parkingSpots)
    return (
      <TabPanel
        key = {index}
        value={value}
        index={index}
        PSpotOptions={cam.parkingSpots}
        url={`http://localhost:12000/setup/getCameraImage?filename=${cam.cameraID}`}
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

const DemoPage = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [allCams, setAllCams] = React.useState({array: [
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
  ]});

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:12000/setup/getAllCameras");
      // console.log(res.data);
      let cams = [];
      for (var cam of res.data){
        cams.push({
          cameraID: cam.cameraID,
          parkingSpots: {
          id: "0",
          value: "root",
          children: cam.parkingSpots.map((spot,index) => {
            return({
              id: `${index+1}`,
              value: spot,
              children: []
            });
          })
        }
        })
      }
      return cams;
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    fetchData().then(data=>setAllCams({array: data}));
  },[]);

  // useEffect( ()=>{
  //   console.log(allCams);
  // },[allCams]);
    
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

export default DemoPage;
