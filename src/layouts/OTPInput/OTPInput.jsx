import React, { useState, useEffect, createRef } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import { Card, Box } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Button from "components/CustomButtons/Button";
import PropTypes from "prop-types";
import { logoImage2 } from "../../assets/img";
import { OTP } from "../../libs/constants";
import styles from "./OTPInput.styles";

function OTPInput(props) {
  const { classes, length, onChange, onResendClick, time, verifyOtp } = props;
  const [inputData, setInputData] = useState([]);
  const [intervalRef, setIntervalRef] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(0);
  useEffect(() => {
    const tempInputData = [];
    for (let count = 0; count < length; count += 1) {
      tempInputData.push({
        ref: createRef(null),
        value: "",
      });
    }
    setTimeRemaining(time);
    setInputData(tempInputData);
  }, []);

  useEffect(() => {
    if (timeRemaining === time) {
      let tempTime = timeRemaining;
      const tempInterval = setInterval(() => {
        tempTime -= 1;
        setTimeRemaining(tempTime);
      }, 1000);
      setIntervalRef(tempInterval);
    }
    if (timeRemaining === 0) {
      clearInterval(intervalRef);
    }
  }, [timeRemaining]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef);
    };
  }, []);

  const handleOTPChange = (index, e) => {
    const tempInputData = [...inputData];
    if (e.target.value.length <= 1) {
      tempInputData[index].value = e.target.value;
      setInputData(tempInputData);
      const otp = [];
      tempInputData.map((el) => {
        otp.push(el.value);
        return null;
      });
      onChange(otp.join(""));
    }
    if (e.target.value && index !== inputData.length - 1) {
      inputData[index + 1].ref.current.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === "Backspace" && index !== 0 && !inputData[index].value) {
      inputData[index - 1].ref.current.focus();
    }
  };

  const handleResendClick = () => {
    clearInterval(intervalRef);
    setTimeRemaining(time);
    onResendClick();
  };

  return (
    <div className={classes.containerDiv}>
      <div className={classes.wrapper}>
        <img alt="logo" src={logoImage2} className={classes.logoStyle} />
        <Card className={classes.card}>
          <CardHeader className={classes.header} title={OTP.title}>
            <Box component="div">
              <img alt="logo" src={logoImage2} />
            </Box>
          </CardHeader>
          <CardContent className={classes.contentWrapper}>
            <div className={classes.wrapper}>
              <div className={classes.otpWrapper}>
                {inputData.map((otpInput, index) => (
                  <input
                    key={index}
                    className={`${classes.input} ${
                      inputData[index].value
                        ? classes.inputActive
                        : classes.inputInactive
                    }`}
                    ref={otpInput.ref}
                    value={otpInput.value}
                    onChange={(e) => handleOTPChange(index, e)}
                    onKeyDown={(e) => handleOTPKeyDown(index, e)}
                  />
                ))}
              </div>
              <div className={classes.lowerPanel}>
                <Typography className={classes.timer}>
                  {Math.floor(timeRemaining / 60).toString(10).length === 1
                    ? `0${Math.floor(timeRemaining / 60)}`
                    : Math.floor(timeRemaining / 60)}
                  :
                  {Math.floor(timeRemaining % 60).toString(10).length === 1
                    ? `0${Math.floor(timeRemaining % 60)}`
                    : Math.floor(timeRemaining % 60)}
                </Typography>
                <Typography
                  className={classes.resend}
                  onClick={handleResendClick}
                >
                  {"Resend"}
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Button
              color="warning"
              className={classes.loginBtn}
              onClick={verifyOtp}
            >
              {OTP.otpVerify}
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

OTPInput.propTypes = {
  classes: PropTypes.object,
  length: PropTypes.number,
  onChange: PropTypes.func,
  onResendClick: PropTypes.func,
  verifyOtp: PropTypes.func,
  time: PropTypes.number,
};

export default withStyles(styles)(OTPInput);
