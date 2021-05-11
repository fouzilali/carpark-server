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
    r.annotations.forEach((annotation, index) => {
      var x1 = annotation.vertices[0].x;
      var y1 = annotation.vertices[0].y;
      const spot = {
        spotID: annotation.selectedOptions[1].value,
        mapXY: {
          x: x1,
          y: y1
        }
      };
      try {
        axios.put(MASTER_URL+"/setup/updateParkingSpot", spot);
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
function renderAllTabs(allCams, value, dir) {
  return allCams.map((cam, index) => {
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
    array: []
  });

  async function fetchData() {
    try {
      const res = await axios.get(MASTER_URL+"/setup/getAllCameras");
      return [
        {
          mapRegion: "LG5",
          parkingSpots: {
            id: "0",
            value: "root",
            children: res.data
              .flatMap(cam =>
                cam.parkingSpots.map(spot => {
                  return {
                    id: `0`,
                    value: spot,
                    children: []
                  };
                })
              )
              .map((c, i) => {
                c.id = `${i + 1}`;
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

export default MapSetup;
