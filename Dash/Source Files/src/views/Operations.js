import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {Component} from "react";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";


class Operations extends Component {
   constructor(props) {
      super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
      this.state = { //state is by default an object
          parkingSpots: []
      }
   }

   componentDidMount() {
    setInterval(() => {
      axios.get('http://localhost:12000/setup/allSpots')
        .then(response => {
          this.setState({ parkingSpots : response.data })
        })
        .catch((error) => {
          console.log(error);
        })
    }, 3000);
  };

  

   renderTableData() {
    return this.state.parkingSpots.map((spot, index) => {
       const licensePlate = spot.licensePlate;
       const spotID = spot.spotID;
       const cameraID = spot.cameraID;
       const vacant = spot.vacant ? "Vacant" : "Occupied";
       return (
          <tr key={spotID}>
             <td>{spotID}</td>
             <td>{cameraID}</td>
             <td>{vacant}</td>
             <td>{licensePlate}</td>
          </tr>
       )
    })
    }

   render() { 
      return (
        <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Parking Spots Status" subtitle="Blog Posts" className="text-sm-left" />
        </Row>
    
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
                        Time Parked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
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