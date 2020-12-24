import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";

export class Stack extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          minWidth: "-webkit-fill-available"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
