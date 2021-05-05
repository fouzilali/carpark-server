import React from "react";
import "./styleCS3.css";
import { easeBounceOut } from "d3-ease";
import { interpolateString } from "d3-interpolate";
import PageTitle from "../components/common/PageTitle";
import { FixedSizeList } from "react-window";
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
} from "shards-react";

import { Button as ShardsButton } from "shards-react";

import {
  Chip,
  ListItem,
} from "@material-ui/core";

function renderRow(props) {
  const { index, style } = props;
  const handleDelete = () => {};
  return (
    <ListItem style={style} key={index}>
      <Chip onDelete={handleDelete} label={`Spot ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

function startAnimationLoop({
  onProgress,
  onComplete,
  duration,
  initialProgress
}) {
  let start = null;
  let requestId = null;

  const startTimeDiff = (initialProgress || 0) * duration;

  const step = timestamp => {
    if (!start) start = timestamp - startTimeDiff;
    let progress = (timestamp - start) / duration;
    if (progress > 1) {
      progress = 1;
    }
    onProgress(progress);

    if (progress < 1) {
      requestId = window.requestAnimationFrame(step);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };
  requestId = window.requestAnimationFrame(step);

  return {
    stop() {
      cancelAnimationFrame(requestId);
    }
  };
}

function getStyles(element, props) {
  const computed = window.getComputedStyle(element);
  return props.reduce((obj, prop) => {
    obj[prop] = computed[prop];
    return obj;
  }, {});
}
/* custom animations */
function slide(element, { duration, direction, onComplete }) {
  const collapsedStyles = {
    marginTop: "0px",
    marginBottom: "0px",
    height: "0px"
  };
  const props = Object.keys(collapsedStyles);

  const [startStyles, targetStyles] =
    direction === "DOWN"
      ? [collapsedStyles, getStyles(element, props)]
      : [getStyles(element, props), collapsedStyles];
  const interpolators = new Map(
    props.map(prop => [
      prop,
      interpolateString(startStyles[prop], targetStyles[prop])
    ])
  );

  return startAnimationLoop({
    duration,
    onComplete,
    onProgress: progress => {
      const delta = easeBounceOut(progress);
      interpolators.forEach((interpolator, prop) => {
        element.style[prop] = interpolator(delta);
      });
    }
  });
}

function slideDown(element, { duration = 750, onComplete } = {}) {
  return slide(element, { direction: "DOWN", duration, onComplete });
}

function slideUp(element, { duration = 750, onComplete } = {}) {
  return slide(element, { direction: "UP", duration, onComplete });
}

class UserTableRow extends React.Component {
  state = { expanded: false, value: "" };

  //classesAccordian = useStylesAccordian();

  // handleChange = this.handleChange.bind(this);
  // handleSubmit = this.handleSubmit.bind(this);

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   console.log(this.props.index)
  //   alert('A name was submitted: ' + this.state.value);
  //   event.preventDefault();
  // }

  toggleExpander = e => {
    if (e.target.type === "checkbox") return;

    if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        }
      });
    }
  };

  render() {
    const { camera } = this.props;

    return [
      <tr key="main" onClick={this.toggleExpander}>
        <td className="uk-text-nowrap">{this.props.index}.</td>
        <td>{camera.cameraID}</td>
        <td>{camera.mac}</td>
        <td>{camera.isActive}</td>
      </tr>,
      this.state.expanded && (
        <tr className="expandable" key="tr-expander">
          <td className="uk-background-muted" colSpan={6}>
            <div ref="expanderBody" className="inner uk-grid">
              <div>
                {/* <form onSubmit={this.handleSubmit}>
                  <label>
                    Name:
                  <input type="text" onChange = {(value) => this.props.updateCID(value,this.props.key)} />
                  </label>
                  <input type="submit" value="Submit" />
                </form> */}

                <input
                  type="text"
                  placeholder="Write text"
                  onChange={e =>
                    this.props.updateCID(e.target.value, this.props.index)
                  }
                />

                {/* /*<Row>
                  <Col>
                    <Form>
                      <FormGroup>
                        <InputGroup className="mb-3">
                          <FormInput type = "text" placeholder = "Enter Camera ID"/>
                            <InputGroupAddon type="append">
                              <ShardsButton theme="white">
                                <i className="material-icons">lock</i>
                              </ShardsButton>
                            </InputGroupAddon>
                        </InputGroup>
                          <Row>
                            <Col lg="5"></Col>
                            <Col sm="12" lg="7">
                              <ShardsButton type ="submit" justify="right"  onClick = {(value) => updateCID(value,index)}>
                                Update Camera ID 
                              </ShardsButton>
                            </Col>
                          </Row>
                      </FormGroup>
                      <FormGroup>
                        <InputGroup className="mb-3">
                          <FormInput placeholder="Add Parking Spot IDs " onChange={() => {}} />
                        </InputGroup>
                        <Row>
                          <Col lg="8"></Col>
                            <Col sm="12" lg="4">
                              <ShardsButton outline justify="right">
                                Add
                              </ShardsButton>
                            </Col>
                        </Row>
                      </FormGroup>
                    </Form>
                  </Col> 
                  <Col>
                    <ul className="list-group">
                    {camera.spotID.map(listitem => (
                      <ListItem>
                      <Chip label={listitem} />
                      </ListItem>

                    ))}
                    </ul>
                  </Col>
                </Row> */}
              </div>
            </div>
          </td>
        </tr>
      )
    ];
  }
}

class CameraSetup4 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cameras: [
        {
          cameraID: "LG2-RowA1",
          isActive: "Active",
          mac: "12:45:88:21:34",
          spotID: [
            "LG2-PS1",
            "LG2-PS2",
            "LG2-PS3",
            "LG2-PS4",
            "LG2-PS5",
            "LG2-PS6",
            "LG2-PS7"
          ]
        },
        {
          cameraID: "LG5-RowC3",
          isActive: "Active",
          mac: "21:23:12:45:67",
          spotID: [
            "LG5-PS1",
            "LG5-PS2",
            "LG5-PS3",
            "LG5-PS4",
            "LG5-PS5",
            "LG5-PS6",
            "LG5-PS7"
          ]
        }
      ]
    };
    this.updateCID = this.updateCID;
    this.addSpot = this.addSpot;
  }

  updateCID = (cid, index) => {
    var { cameras } = Object.assign({}, this.state);
    cameras[index - 1].cameraID = cid;
    this.setState({ cameras });
  };

  addSpot = (spot, index) => {
    var { cameras } = Object.assign({}, this.state);
    cameras[index - 1].spotID.push(spot);
    this.setState({ cameras });
  };

  render() {
    const { cameras } = this.state;
    const isLoading = cameras === null;
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            sm="4"
            title="Camera Setup"
            subtitle="Dashboard"
            className="text-sm-left"
          />
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom" />
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="uk-table-shrink" />
                      <th>Camera ID</th>
                      <th>Mac</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={6} className="uk-text-center">
                          <em className="uk-text-muted">Loading...</em>
                        </td>
                      </tr>
                    ) : (
                      cameras.map((camera, index) => (
                        <UserTableRow
                          updateCID={this.updateCID}
                          addSpot={this.addSpot}
                          key={index}
                          index={index + 1}
                          camera={camera}
                        />
                      ))
                    )}
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

export default CameraSetup4;
