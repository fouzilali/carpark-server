import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import {Component} from "react";
import PageTitle from "../components/common/PageTitle";
import axios from "axios";
import { useState, useRef, useEffect } from "react";

const CameraSetup2 = () => {
  const [cameraID, setCameraID] = useState('#');
  const [cameraMAC, setCameraMAC] = useState("00:AA:11:BB:22:CC");
  const [disabled, setDisabled] = useState(false);
  const textInput = useRef(null);
  //const classes = useStyles();
  //const classesAccordian = useStylesAccordian();
  const title = "Cameras Available";
  const [allCams, setAllCams] = useState([]);
  const [hasError, setErrors] = useState(false);
  
  function handleGameClick() {
    setDisabled(!disabled);
  } 

  
  const handleCIDUpdate = e => {
   setCameraID("textInput.current.focus()");
  }

 
  /*Use like so*/

  async function fetchData() {
    const res = await axios.get("http://localhost:12000/setup/getAllCameras");
    setAllCams(res.data);    
  };
  
  useEffect(() => {
    fetchData();    
  },[]);

  useEffect( ()=>{
    console.log(allCams);
  },[allCams]);

    // State variable to keep track of all the expanded rows
  // By default, nothing expanded. Hence initialized with empty array.
//   const [expandedRows, setExpandedRows] = useState([]);

//   // State variable to keep track which row is currently expanded.
//   const [expandState, setExpandState] = useState({});

//   /**
//    * This function gets called when show/hide link is clicked.
//    */
//   const handleEpandRow = (event, userId) => {
//     const currentExpandedRows = expandedRows;
//     const isRowExpanded = currentExpandedRows.includes(userId);

//     let obj = {};
//     isRowExpanded ? (obj[userId] = false) :  (obj[userId] = true);
//     setExpandState(obj);

//     // If the row is expanded, we are here to hide it. Hence remove
//     // it from the state variable. Otherwise add to it.
//     const newExpandedRows = isRowExpanded ?
//           currentExpandedRows.filter(id => id !== userId) :
//           currentExpandedRows.concat(userId);

//     setExpandedRows(newExpandedRows);
//   }

//   return(
//     <Container>
//       <Row>
//         <Col>
//           <h1> Cameras({ allCams.length })</h1>
//         </Col>
//       </Row>
//       <Row>
//         <Col sm={12}>
//           <Table responsive variant="dark">
//             <thead>
//                 <tr>
//                   <th></th>
//                   <th>Camera ID</th>
//                   <th>Status</th>

//                 </tr>
//             </thead>
//             <tbody>
//             {
//               data.map((user) =>
//               <>
//                 <tr key={user.id}>
//                     <td>
//                       <img src={user['photo']} alt="" />
//                     </td>
//                     <td>
//                       {user['first_name']}
//                     </td>
//                     <td>
//                       {user['last_name']}
//                     </td>
//                     <td>
//                       {user['email']}
//                     </td>
//                     <td>
//                       {user['gender']}
//                     </td>
                  
//                     <td>
//                       <Button
                        
//                           variant="link"
//                           onClick={event => handleEpandRow(event, user.id)}>
//                           {
//                             expandState[user.id] ?
//                               'Hide' : 'Show'
//                           }
//                       </Button>
//                     </td>
//                 </tr>
//                 <>
//                 {
//                   expandedRows.includes(user.id) ?
//                   <tr>
//                     <td colspan="6">
//                       <div style={{backgroundColor: '#343A40', color: '#FFF', padding: '10px'}}>
//                         <h2> Details </h2>
//                         <ul>
//                           <li>
//                             <span><b>Full Name:</b></span> {' '}
//                             <span> { user['first_name'] } {' '} { user['last_name'] } </span>
//                           </li>
//                           <li>
//                             <span><b>Company:</b></span> {' '}
//                             <span> { user.company } </span>
//                           </li>
//                           <li>
//                             <span><b>Department:</b></span> {' '}
//                             <span> { user.department } </span>
//                           </li>
//                           <li>
//                             <span><b>Ip:</b></span> {' '}
//                             <span> { user['ip_address'] } </span>
//                           </li>
//                           <li>
//                             <span><b>Best Movie:</b></span> {' '}
//                             <span> { user.movies } </span>
//                           </li>
//                           <li>
//                             <span><b>About:</b></span> {' '}
//                             <span> { user.about } </span>
//                           </li>
//                         </ul>
//                       </div>
//                     </td>
//                   </tr> : null
//                 }
//                 </>
//               </> 
//               )}
//             </tbody>
//           </Table>
//        </Col>
//       </Row>
//     </Container>
//   )



  function renderTableData() {
    return allCams.map((spot, index) => {
       const cameraID = spot.cameraID;
       const isActive = spot.isActive ? "Active" : "Inactive";
       const parkingSpots = spot.parkingSpots;
       return (
          <tr key={cameraID}>
             <td>{cameraID}</td>
             <td>{isActive}</td>
          </tr>
       )
    })
    };
        return (
          <Container fluid className="main-content-container px-4">
          <Row noGutters className="page-header py-4">
            <PageTitle sm="4" title="Camera Setup" subtitle="Blog Posts" className="text-sm-left" />
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
                          Camera ID
                        </th>
                        <th scope="col" className="border-0">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                    {renderTableData()}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Container>
        );
     
};

export default CameraSetup2;