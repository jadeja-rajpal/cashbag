import React from "react";
import Card from "@material-ui/core/Card";
import CardAvatar from "components/Card/CardAvatar";
import CardBody from "components/Card/CardBody";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Button from "components/CustomButtons/Button";
import { USER_PROFILE } from "../../libs/constants";
import styles from "./UserProfile.styles";

function UserProfile(props) {
  const { classes } = props;
  return (
    <>
      <Card profile={"true"} className={classes.wrapper}>
        <CardAvatar profile={"true"} className={classes.profileImage}>
          <img src={props.img} alt="..." />
        </CardAvatar>
        <CardBody profile={true}>
          <div className={classes.cardTitle}>{props.name}</div>
          <div>
            {props.userInfo &&
              props.userInfo.map((item, index) => {
                return (
                  <div className={classes.list} key={index}>
                    <span className={classes.listTitle}>{item.title}</span>
                    <span className={classes.listValue}>{item.value}</span>
                  </div>
                );
              })}
          </div>
          <div className={classes.kycInfo}>
            <div className={classes.cardTitle}>{USER_PROFILE.KYC_INFO}</div>
            <div>
              {props.kycInfo &&
                props.kycInfo.map((item, index) => {
                  return (
                    <div className={classes.list} key={index}>
                      <span className={classes.listTitle}>{item.title}</span>
                      <span className={classes.listValue}>{item.value}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={classes.cardInfo}>
            <div className={classes.cardTitle}>{USER_PROFILE.CARD_INFO}</div>
            <div>
              {props.cardInfo &&
                props.cardInfo.map((item, index) => {
                  return (
                    <div key={index}>
                      <span className={classes.listValue}>{item.value}</span>
                    </div>
                  );
                })}
            </div>
          </div>
          <br />
          <Button color="primary">{USER_PROFILE.RESET_PASSWORD}</Button>
          <br />
        </CardBody>
      </Card>
    </>
  );
}

UserProfile.propTypes = {
  classes: PropTypes.object,
  name: PropTypes.string,
  img: PropTypes.any,
  userInfo: PropTypes.array,
  kycInfo: PropTypes.array,
  cardInfo: PropTypes.array,
};

UserProfile.defaultProps = {
  showPrint: false,
  showExport: false,
  showFilter: false,
  showSearch: false,
};

export default withStyles(styles)(UserProfile);
