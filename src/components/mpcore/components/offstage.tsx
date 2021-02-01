import { Component } from "react";
import { MPComponentsProps } from "../component";
import React from "react";

export class Offstage extends Component<{ data: MPComponentsProps }> {
  render() {
    if (this.props.data.attributes.offstage === true) {
      return null;
    } else {
      return this.props.children;
    }
  }
}
