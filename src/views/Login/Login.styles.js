import { createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() =>
  createStyles({
    containerDiv: {
      margin: "auto",
      paddingTop: "15vh",
    },
    container: {
      display: "flex",
      flexWrap: "wrap",
      margin: "auto",
    },
    loginBtn: {
      marginBottom: 20,
      fontSize: "large",
      fontWeight: "bold",
      width: "-webkit-fill-available",
    },
    wrapper: {
      width: 550,
      margin: "auto",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    header: {
      textAlign: "center",
      background: "#4a4b46",
      color: "rgb(241, 178, 49)",
    },
    card: {
      margin: "auto",
      width: 550,
    },
    cardActions: {
      display: "block",
    },
    logoStyle: {
      paddingBottom: 10,
    },
    media: {
      paddingTop: 20,
      paddingBottom: 0,
      display: "flex",
      justifyContent: "center",
    },
    contentWrapper: {
      paddingTop: 10,
    },
    inputFieldLogin: {
      color: "red",
    },
  })
);

export default useStyles;
