import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import axios from "axios";
import { FixedSizeList } from "react-window";
import {
  Row,
  Col,
  CardBody,
  CardTitle,
  Form,
  FormInput,
  FormSelect,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "shards-react";

import { Button as ShardsButton } from "shards-react";

import {
  Container,
  Chip,
  CssBaseline,
  Typography,
  Paper,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Divider,
  AccordionActions,
  ListItem,
  ListItemText
} from "@material-ui/core";

import PageTitle from "./../components/common/PageTitle";
import { disable } from "debug";
import SelectInput from "@material-ui/core/Select/SelectInput";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

const useStylesAccordian = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15)
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.33%"
  },
  columnSecondary: {
    flexBasis: "10%"
  },
  columnForm: {
    flexBasis: "66%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2)
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline"
    }
  }
}));

function renderRow(props) {
  const { index, style } = props;
  const handleDelete = () => {};
  return (
    <ListItem style={style} key={index}>
      <Chip onDelete={handleDelete} label={`Spot ${index + 1}`} />
    </ListItem>
  );
}

function renderAccordian(props) {}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired
};

const useStylesList = makeStyles(theme => ({
  root: {
    width: "100%",
    height: 400,
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  }
}));

const CameraSetup = () => {
  const [cameraID, setCameraID] = useState("#");
  const [cameraMAC, setCameraMAC] = useState("00:AA:11:BB:22:CC");
  const [disabled, setDisabled] = useState(false);
  const textInput = useRef(null);
  const classes = useStyles();
  const classesAccordian = useStylesAccordian();
  const title = "Cameras Available";
  const [allCams, setAllCams] = useState([]);
  const [hasError, setErrors] = useState(false);

  function handleGameClick() {
    setDisabled(!disabled);
  }

  const handleCIDUpdate = e => {
    setCameraID("textInput.current.focus()");
  };

  /*Use like so*/

  async function fetchData() {
    const res = await axios.get("http://localhost:12000/setup/getAllCameras");
    setAllCams(res.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle
            title="Camera Setup"
            subtitle="Dashboard"
            className="text-sm-left mb-3"
          />
        </Row>
        <Row>
          {/* Users Overview */}
          <Col lg="6" md="6" sm="6" className="mb-4">
            <Card className={classes.root}>
              <CardBody>
                {/* <Row noGutters className="page-header py-2 px-4"> */}
                <CardTitle>{title}</CardTitle>
                {/* </Row> */}
                <div className={classesAccordian.root}>
                  <Accordion defaultExpanded>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1c-content"
                      id="panel1c-header"
                    >
                      <div className={classesAccordian.column}>
                        <Typography className={classesAccordian.heading}>
                          Camera:{cameraID}
                        </Typography>
                      </div>
                      <div className={classesAccordian.columnSecondary}>
                        <Typography
                          className={classesAccordian.secondaryHeading}
                        >
                          MAC:
                        </Typography>
                      </div>
                      <div className={classesAccordian.column}>
                        <Typography
                          className={classesAccordian.secondaryHeading}
                        >
                          {cameraMAC}
                        </Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails className={classesAccordian.details}>
                      <div className={classesAccordian.columnForm}>
                        <Col>
                          <Form>
                            <FormGroup>
                              <InputGroup className="mb-3">
                                <FormInput
                                  type="text"
                                  ref={textInput}
                                  placeholder="Enter Camera ID"
                                  disabled={disabled}
                                />
                                <InputGroupAddon type="append">
                                  <ShardsButton
                                    theme="white"
                                    onClick={handleGameClick}
                                  >
                                    <i className="material-icons">lock</i>
                                  </ShardsButton>
                                </InputGroupAddon>
                              </InputGroup>
                              <Row>
                                <Col lg="5"></Col>
                                <Col sm="12" lg="7">
                                  <ShardsButton type="submit" justify="right">
                                    Update Camera ID
                                  </ShardsButton>
                                </Col>
                              </Row>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup className="mb-3">
                                <FormInput
                                  placeholder="Add Parking Spot IDs "
                                  onChange={() => {}}
                                />
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
                      </div>
                      <Divider orientation="vertical" flexItem />
                      <Col>
                        <FixedSizeList
                          height={200}
                          width={200}
                          itemSize={46}
                          itemCount={15}
                        >
                          {renderRow}
                        </FixedSizeList>
                      </Col>
                    </AccordionDetails>
                    <Divider />
                    <AccordionActions>
                      <Button size="small">Cancel</Button>
                      <Button size="small" color="primary">
                        Save
                      </Button>
                    </AccordionActions>
                  </Accordion>
                </div>
              </CardBody>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CameraSetup;
