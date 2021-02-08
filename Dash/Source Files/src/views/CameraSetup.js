import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Container,
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
  Box
} from "@material-ui/core";

import { Row, Col, CardBody, CardTitle} from "shards-react";
import PageTitle from "./../components/common/PageTitle";

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
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const CameraSetup = () => {
  const classes = useStyles();
  const classesAccordian = useStylesAccordian();
  const title = "Cameras Available"
  const bull = <span className={classes.bullet}>•</span>;
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
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography className={classesAccordian.heading}>
                        <Grid
                          container
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                        >
                          <Box textAlign="left">#camera     |</Box>
                          <Box textAlign="center"> IP: 192.168.1.1      |</Box>
                          <Box textAlign="right"> Mac: 00:1B:44:11:3A:B7</Box>                          
                        </Grid>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        No Parking Spots Added to this Camera Yet.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                      <Typography className={classesAccordian.heading}>
                      <Grid
                          container
                          direction="row"
                          justify="space-around"
                          alignItems="center"
                        >
                          <Box textAlign="left">#camera |</Box>
                          <Box textAlign="center"> IP: 192.168.1.1 |</Box>
                          <Box textAlign="right"> Mac: 00:1B:54:11:3Z:B6</Box>
                        </Grid>
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse malesuada lacus ex, sit amet blandit leo
                        lobortis eget.
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel3a-content"
                      id="panel3a-header"
                    >
                      <Typography className={classesAccordian.heading}>
                        Disabled Accordion
                      </Typography>
                    </AccordionSummary>
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
