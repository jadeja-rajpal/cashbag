import React from "react";
// react plugin for creating charts
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table";
import CustomTabs from "components/CustomTabs/CustomTabs";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardIcon from "components/Card/CardIcon";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import { DASHBOARD } from "libs/constants";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle";
import earnings from "./Dashboard.constants";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const {
    AGM,
    TOP_5_CDM,
    TOP_5_BM,
    TOP_5_AM,
    AM,
    BM,
    CDM,
    MONEY_STATS,
    AGM_SUBTITLE,
    MONEY_SUBTITLE,
    AGM_FULL,
    AM_FULL,
    BM_FULL,
    CDM_FULL,
  } = DASHBOARD;
  return (
    <div>
      <GridContainer>
        {earnings({
          AGM,
          AM,
          BM,
          CDM,
          AGM_FULL,
          CDM_FULL,
          BM_FULL,
          AM_FULL,
        }).map((earning, index) => (
          <GridItem xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardHeader color={earning.color} stats icon>
                <CardIcon color={earning.color}>{earning.title}</CardIcon>
                <h4 className={classes.cardCategory}>{earning.name}</h4>
                <h3 className={classes.cardTitle}>{earning.data}</h3>
              </CardHeader>
              <CardFooter></CardFooter>
            </Card>
          </GridItem>
        ))}
      </GridContainer>

      <GridContainer>
        <GridItem xs={12}>
          <CustomTabs
            title="Top 5"
            headerColor="primary"
            tabs={[
              {
                tabName: TOP_5_CDM,
                tabContent: (
                  // TODO: table will be replaced later
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["No", "Name", "Revenue"]}
                    tableData={[
                      ["1", "Dakota Rice", "$36,738"],
                      ["2", "Ashutosh Singh Hooper", "$23,789"],
                      ["3", "Sage Rodriguez", "$56,142"],
                      ["4", "Philip Chaney", "$38,735"],
                      ["5", "Philip Chaney", "$38,735"],
                    ]}
                  />
                ),
              },
              {
                tabName: TOP_5_AM,
                tabContent: (
                  // TODO: table will be replaced later
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["No", "Name", "Revenue"]}
                    tableData={[
                      ["1", "Ashutosh Singh", "36,738"],
                      ["2", "Sumit Kumar Gupta", "23,789"],
                      ["3", "Anshika Negi", "56,142"],
                      ["4", "Aman Bansal", "38,735"],
                      ["5", "Mohit Aggrawal", "38,735"],
                    ]}
                  />
                ),
              },
              {
                tabName: TOP_5_BM,
                tabContent: (
                  // TODO: table will be replaced later
                  <Table
                    tableHeaderColor="warning"
                    tableHead={["No", "Name", "Revenue"]}
                    tableData={[
                      ["1", "Ashutosh Singh", "36,738"],
                      ["2", "Sumit Kumar Gupta", "23,789"],
                      ["3", "Anshika Negi", "56,142"],
                      ["4", "Rohan Bhardwaj", "38,735"],
                      ["5", "Mohit Aggrawal", "38,735"],
                    ]}
                  />
                ),
              },
            ]}
          />
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>{AGM}</h4>
              <p className={classes.cardCategoryWhite}>{AGM_SUBTITLE}</p>
            </CardHeader>
            <CardBody>
              {/** TODO: table will be replaced later */}
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Revenue"]}
                tableData={[
                  ["1", "Ashutosh Singh", "36,738"],
                  ["2", "Sumit Kumar Gupta", "23,789"],
                  ["3", "Anshika Negi", "56,142"],
                  ["4", "Rohan Bhardwaj", "38,735"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>{MONEY_STATS}</h4>
              <p className={classes.cardCategoryWhite}>{MONEY_SUBTITLE}</p>
            </CardHeader>
            <CardBody>
              {/** TODO: table will be replaced later */}

              <Table
                tableHeaderColor="warning"
                tableHead={["No.", "Name", "Amount"]}
                tableData={[
                  ["1", "Orders", "36,738"],
                  ["2", "Services", "23,789"],
                  ["3", "Cash bag orders", "56,142"],
                  ["4", "Total liability", "38,735"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
