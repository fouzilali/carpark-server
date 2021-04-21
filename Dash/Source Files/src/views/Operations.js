import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { Component } from "react";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";
import hostname from "../hostname";

class Operations extends Component {
  constructor(props) {
    super(props); //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = {
      //state is by default an object
      parkingSpots: []
    };
  }

  componentDidMount() {
    setInterval(() => {
      axios
        .get(`http://${hostname}:12000/setup/allSpots`)
        .then(response => {
          this.setState({ parkingSpots: response.data });
        })
        .catch(error => {
          console.log(error);
        });
    }, 3000);
  }

  renderTableData() {
    return this.state.parkingSpots.map((spot, index) => {
      const licensePlate = spot.lpNumber;
      const spotID = spot.spotID;
      const cameraID = spot.cameraID;
      const vacant = spot.vacant ? "Vacant" : "Occupied";
      const timeParked = spot.timeParked;
      const elapsedTime = null;
      return (
        <tr key={spotID}>
          <td>{spotID}</td>
          <td>{cameraID}</td>
          <td>{vacant}</td>
          <td>{licensePlate}</td>
          <td>{timeParked}</td>
          <td>{elapsedTime}</td>
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
            subtitle="Blog Posts"
            className="text-sm-left"
          />
        </Row>
        <Row></Row>
        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">Parking Spots</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
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
