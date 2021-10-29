import React from "react";
import { Card } from "@material-ui/core";

function WrapCard (props) {
    return <Card className = {props.className}>{props.children}</Card>
}

export default WrapCard