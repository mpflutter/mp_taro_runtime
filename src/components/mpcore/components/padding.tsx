import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssPadding } from "../utils/geometry";

export class Padding extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <div style={{ ...cssPadding(this.props.data.attributes.padding) }}>
        {this.props.children}
      </div>
    );
  }
}
