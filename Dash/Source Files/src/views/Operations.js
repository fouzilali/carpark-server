import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button
} from "shards-react";
import { Component } from "react";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";
import PlayArrowOutlinedIcon from "@material-ui/icons/PlayArrowOutlined";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

class Operations extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      parkingSpots: []
    };
  }

  handleStart() {
    console.log("start button clicked");
    axios.post("/operation/startAllCameras")
  }

  handleStop() {
    console.log("stop button clicked")
    axios.post("/operation/startAllCameras")
  }

  componentDidMount() {
    setInterval(() => {
      axios
        .get("/setup/allSpots")
        .then(response => {
          this.setState({ parkingSpots: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }, 3000);
  }

  renderTableData() {
    function get_time_diff(datetime) {
      if (typeof datetime !== "undefined") {
        var datetime = datetime;
      } else {
        return null;
      }
      console.log("Debug");
      console.log(datetime, new Date());
      var datetime = new Date(datetime).getTime();
      var now = new Date().getTime();
      console.log(datetime, now);

      if (isNaN(datetime)) {
        return "";
      }

      // console.log(datetime + " " + now);

      if (datetime < now) {
        var millisec_diff = now - datetime;
      } else {
        var millisec_diff = datetime - now;
      }

      var days = Math.floor(millisec_diff / 1000 / 60 / (60 * 24));

      var date_diff = new Date(millisec_diff);
      console.log(date_diff);

      if (millisec_diff < 2 * 60 * 1000) {
        return "Just Now";
      }

      var timeDiff = "";
      if (days > 0) {
        timeDiff = timeDiff + String(days) + " Days ";
      }
      if (date_diff.getUTCHours() > 0) {
        timeDiff = timeDiff + String(date_diff.getUTCHours()) + " Hours ";
        // timeDiff = timeDiff + String(date_diff.getHours() - 8) + " Hours ";
      }
      return timeDiff + date_diff.getUTCMinutes() + " Mins ";
    }

    function get_time(datetime) {
      const time = new Date(datetime);
      if (isNaN(time)) {
        return null;
      }
      return (
        time.getDate() +
        "-" +
        (time.getMonth() + 1) +
        "-" +
        time.getFullYear() +
        " " +
        time.getHours() +
        ":" +
        time.getMinutes()
      );
    }

    return this.state.parkingSpots.map((spot, index) => {
      const spotID = spot.spotID;
      const cameraID = spot.cameraID;
      const vacant = spot.vacant ? (
        <Button outline disabled>
          &nbsp; Vacant &nbsp;
        </Button>
      ) : (
        <Button disabled outline theme="danger">
          Occupied
        </Button>
      );
      var licensePlate = "";
      var timeParked = "";
      var elapsedTime = "";
      if (!spot.vacant) {
        licensePlate = spot.lpNumber;
        timeParked = get_time(spot.timeEntered);
        elapsedTime = get_time_diff(spot.timeEntered);
      }
      return (
        <tr key={spotID}>
          <td>{spotID}</td>
          <td>{cameraID}</td>
          <td>{vacant}</td>
          <td>{licensePlate}</td>
          <td>{elapsedTime}</td>
          <td>{timeParked}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Parking Spots Status"
            className="text-sm-left"
          />
          <Col sm="4" />
          <Button justify="left" onClick={this.handleStart}>
            <PlayArrowOutlinedIcon />
            Start Cams
          </Button>
          <Col sm="1" />
          <Button justify="right" onClick={this.handleStop} theme="danger" outline>
            <StopRoundedIcon />
            Stop Cams
          </Button>
        </Row>
        <Row></Row>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom"></CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-gray">
                    <tr>
                      <th scope="col" className="border-0">
                        Spot ID
                      </th>
                      <th scope="col" className="border-0">
                        Camera ID
                      </th>
                      <th scope="col" className="border-0">
                        Vacancy
                      </th>
                      <th scope="col" className="border-0">
                        Licence Plate Number
                      </th>
                      <th scope="col" className="border-0">
                        Elapsed Time
                      </th>
                      <th scope="col" className="border-0">
                        Time Parked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/*<tr key={1}>
                  <td>A1</td>
                  <td>c123</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr>
                  <tr key={1}>
                  <td>A2</td>
                  <td>c123</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr>
                  <tr key={1}>
                  <td>A3</td>
                  <td>c123</td>
                  <td>Occupied</td>
                  <td>UE 2122</td>
                  <td>10H 19M</td>
                  <td>9H 41M</td>
                  </tr>
                  <tr key={1}>
                  <td>A4</td>
                  <td>c123</td>
                  <td>Occupied</td>
                  <td>ZD 2672</td>
                  <td>9H 45M</td>
                  <td>10H 15M</td>
                  </tr>
                  <tr key={1}>
                  <td>B4</td>
                  <td>D634</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr>
                  <tr key={1}>
                  <td>C5</td>
                  <td>D634</td>
                  <td>Occupied</td>
                  <td>HX 9834</td>
                  <td>4H 30M</td>
                  <td>15H 30M</td>
                  </tr>
                  <tr key={1}>
                  <td>C6</td>
                  <td>F174</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr>
                  <tr key={1}>
                  <td>E5</td>
                  <td>D634</td>
                  <td>Occupied</td>
                  <td>EF 9801</td>
                  <td>30M</td>
                  <td>19H 30M</td>
                  </tr>
                  <tr key={1}>
                  <td>G6</td>
                  <td>D634</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr>
                  <tr key={1}>
                  <td>G7</td>
                  <td>F834</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr>
                  <tr key={1}>
                  <td>B4</td>
                  <td>D634</td>
                  <td>Vacant</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                  </tr> */}

                    {this.renderTableData()}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Operations;
