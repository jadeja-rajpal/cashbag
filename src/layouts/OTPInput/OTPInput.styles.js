const styles = {
  wrapper: {
    paddingTop: "30px",
    margin: "auto",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
  },
  otpWrapper: {
    display: "flex",
    width: "100%",
  },
  input: {
    border: "none",
    background: "none",
    color: "orange",
    fontSize: "20px",
    marginLeft: "4px",
    marginRight: "4px",
    textAlign: "center",
    paddingTop: "7px",
    paddingBottom: "7px",
    width: "100%",
    "&:focus": {
      borderBottom: "2px solid #f1b231",
      opacity: "1",
    },
  },
  inputActive: {
    borderBottom: "2px solid #f1b231",
  },
  inputInactive: {
    borderBottom: "2px solid black",
    opacity: "0.4",
  },
  lowerPanel: {
    paddingLeft: "4px",
    paddingRight: "4px",
    display: "flex",
    width: "100%",
    color: "black",
    justifyContent: "space-between",
    marginTop: "8px",
  },
  resend: {
    fontSize: "12px",
    cursor: "pointer",
    color: "black",
  },
  timer: {
    fontSize: "12px",
    color: "black",
  },
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
};

export default styles;
