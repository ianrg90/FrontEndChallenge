import React from "react";
import { Button } from "@material-ui/core";

function Buttons(props) {
  return (
    <Button onClick={props.onClick} variant={props.variant} color={props.color}>
      {props.text}
    </Button>
  );
}

export default Buttons;
