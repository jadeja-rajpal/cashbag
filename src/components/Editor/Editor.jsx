import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import "./Editor.scss";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import styles from "assets/jss/material-dashboard-react/components/customInputStyle";
import classNames from "classnames";
import { Box } from "@material-ui/core";

const useStyles = makeStyles(styles);

const Editor = ({
  onChange,
  content,
  label,
  note,
  isError,
  helperText,
  id,
  success,
}) => {
  const classes = useStyles();

  const labelClasses = classNames({
    [` ${classes.labelRootError}`]: isError,
    [` ${classes.labelRootSuccess}`]: success && !isError,
  });

  return (
    <div className="ck-editor-wrapper">
      <div className="ck-ediotr-container">
        {label && (
          <InputLabel className={classes.labelRoot + labelClasses} htmlFor={id}>
            {label}
          </InputLabel>
        )}
        <Box mt={1}>
          <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={(event, editor) => onChange(event, editor)}
            config={{
              font: "Arial",
              fontSize: "12px",
              toolbar: [
                "heading",
                "bold",
                "italic",
                "bulletedList",
                "numberedList",
              ],
            }}
          />
        </Box>
        {helperText && (
          <>
            <span className={classes.error}>{helperText}</span>
            <br />
          </>
        )}
        {note && <span className={classes.error}>{note}</span>}
      </div>
    </div>
  );
};

Editor.propTypes = {
  onChange: PropTypes.func,
  content: PropTypes.string,
  label: PropTypes.string,
  note: PropTypes.string,
  isError: PropTypes.bool,
  helperText: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  success: PropTypes.bool,
};

export default Editor;
