import React from "react";
import PropTypes from "prop-types";
import { Modal, Box, Typography } from "@material-ui/core";
import Button from "components/CustomButtons/Button";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import styles from "./ConfirmationModal.styles";

const useStyles = makeStyles(styles);

function ConfirmationModal(props) {
  const classes = useStyles();

  return (
    <Modal
      open={true}
      onClose={props.closeModal}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={true}>
        <Box className={classes.paper}>
          <Box className={classes.header}>
            <Typography
              className={classes.title}
              key="filter title"
              color="textPrimary"
            >
              {props.headerTitle}
            </Typography>
          </Box>
          <hr />
          <Box mt={2} mb={2} className={classes.msg}>
            {props.confirmationMsg}
          </Box>
          <Box className={classes.footer}>
            <Button onClick={props.handleCancel}>{props.cancel}</Button>
            <Button color="warning" onClick={props.handleSave}>
              {props.save}
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  confirmationMsg: PropTypes.string,
  headerTitle: PropTypes.string,
  handleCancel: PropTypes.func,
  handleSave: PropTypes.func,
  closeModal: PropTypes.func,
  cancel: PropTypes.string,
  save: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  save: "Yes",
  cancel: "No",
  headerTitle: "Confirmation Modal",
  confirmationMsg: "Are you sure you want to delete ?",
};

export default ConfirmationModal;
