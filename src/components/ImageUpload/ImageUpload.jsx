import React from "react";
import PropType from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import stylesGlobal from "assets/jss/material-dashboard-react/components/customInputStyle";
import classNames from "classnames";
import UploadIcon from "../../assets/img/Upload";
import styles from "./ImageUpload.styles";

const useStyles = makeStyles(styles);
const useStylesGlobal = makeStyles(stylesGlobal);

function ImageUpload(props) {
  const classes = useStyles();
  const classesGlobbal = useStylesGlobal();
  const fileInput = React.createRef();
  const formData = new FormData();

  const labelClasses = classNames({
    [` ${classesGlobbal.labelRootError}`]: props.error,
    [` ${classesGlobbal.labelRootSuccess}`]: props.success && !props.error,
  });

  const upload = (e) => {
    formData.append("document", e.target.files[0]);
    props.handleImageChange(formData);
  };

  const fileUpload = () => {
    fileInput.current.click();
  };
  const clearFileData = () => {
    fileInput.current.value = null;
  };

  return (
    <div className={classes.wrapper}>
      <InputLabel
        className={classesGlobbal.labelRoot + labelClasses}
        htmlFor={props.label}
      >
        {props.label}
      </InputLabel>
      <div
        onClick={fileUpload}
        className={`${classes.fileInput} ${
          props.error && classes.errorFileInput
        }`}
      >
        {/* TODO {props.loading && <CircularProgress color="red" />} */}
        {props.src !== null && (
          <div>
            <span onClick={() => clearFileData()}></span>
          </div>
        )}
        {props.src === null ? (
          <UploadIcon class={classes.uploadIcon} />
        ) : (
          <div>
            <img className={classes.imageView} src={props.src} />
          </div>
        )}
        <form encType="multipart/form-data">
          <div onClick={() => fileUpload()}></div>
          <input
            accept="image/x-png,image/gif,image/jpeg"
            type="file"
            className={classes.inputFile}
            onChange={(event) => upload(event)}
            ref={fileInput}
          />
        </form>
      </div>
      {props.error && (
        <>
          <span className={classes.errorMsg}>{props.helperText}</span>
          <br />
        </>
      )}
      {props.note && <span className={classes.errorMsg}>{props.note}</span>}
    </div>
  );
}

ImageUpload.propTypes = {
  title: PropType.string.isRequired,
  content: PropType.string,
  imageUrl: PropType.string,
  handleImageChange: PropType.func.isRequired,
  label: PropType.string,
  success: PropType.bool,
  error: PropType.bool,
  helperText: PropType.string,
  note: PropType.string,
  src: PropType.string,
  loading: PropType.bool,
};

ImageUpload.defaultProps = {
  id: null,
  title: "Upload File",
  content: "Image Logo",
};

export default ImageUpload;
