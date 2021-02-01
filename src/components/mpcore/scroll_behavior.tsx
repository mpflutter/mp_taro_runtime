import React from "react";
import { MPComponentsProps } from "./component";

export class ScrollBehavior extends React.Component<{
  displayingDialog: boolean;
  scaffold: MPComponentsProps;
}> {
  componentDidMount() {
    this.setupBodyScrollBehavior();
  }

  componentDidUpdate() {
    this.setupBodyScrollBehavior();
  }

  setupBodyScrollBehavior() {
    if (this.props.displayingDialog) {
      document.body.style.setProperty("overflow", "hidden");
    } else if (this.props.scaffold?.attributes.isListBody === true) {
      document.body.style.setProperty("overflow", "unset");
    } else {
      document.body.style.setProperty("overflow", "hidden");
    }
  }

  render() {
    return <span></span>;
  }
}
