import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { grey } from "@material-ui/core/colors";

const Theme = withStyles({
  root: {
    paddingTop: "10px",
    boxShadow: "none",
    textTransform: "none",
    fontSize: "1rem",
    fontFamily: "'Zilla Slab', serif",
    "&:hover": {
      backgroundColor: grey[900],
    },
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "5px 0px 10px 20px",
    backgroundColor: "black",
  },
}));

export default function StyledButton(props) {
  const classes = useStyles();

  return (
    <div>
      <Theme
        onClick={props.onClick}
        variant="contained"
        color="secondary"
        className={classes.margin}
      >
        {props.content}
      </Theme>
    </div>
  );
}
