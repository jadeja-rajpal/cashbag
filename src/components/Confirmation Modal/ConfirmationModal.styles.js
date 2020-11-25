import {
  primaryBoxShadow,
  warningBoxShadow,
  warningColor,
  defaultFont,
} from "assets/jss/material-dashboard-react";

export default {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    opacity: 0.9,
    ...defaultFont,
  },
  paper: {
    minWidth: "300px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
    border: "1px solid grey",
    borderRadius: "8px",
    opacity: "1 !important",
    ...primaryBoxShadow,
    ...defaultFont,
  },
  header: {
    opacity: 1,
    display: "flex",
    borderRadius: "8px 8px 0px 0px",
    backgroundColor: warningColor[0],
    padding: "5px",
    ...warningBoxShadow,
  },
  title: {
    opacity: 1,
    fontWeight: "600",
    fontSize: "20px",
    marginTop: "10px",
    paddingLeft: "5px",
  },
  msg: {
    opacity: 1,
    display: "flex",
    justifyContent: "center",
    color: "black",
    fontWeight: "400",
  },
  footer: {
    opacity: 1,
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    padding: "10px",
  },
};
