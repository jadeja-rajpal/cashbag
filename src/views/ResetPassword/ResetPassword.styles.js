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
    header: {
      textAlign: "center",
      background: "#4a4b46",
      color: "rgb(241, 178, 49)",
    },
    card: {
      margin: "auto",
      width: 550,
    },
    media: {
      paddingTop: 20,
      paddingBottom: 0,
      display: "flex",
      justifyContent: "center",
    },
    wrapper: {
      width: 550,
      margin: "auto",
      alignItems: "center",
      display: "flex",
      flexDirection: "column",
    },
    logoStyle: {
      paddingBottom: 10,
    },
    changePasswordTitle: {
      fontSize: "20px",
      fontWeight: 500,
      marginBottom: "-20px",
    },
  })
);

export default useStyles;
