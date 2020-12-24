import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssBorderRadius } from "../utils/geometry";
import { DivContextProvider } from "./div_context";

export class ClipRRect extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          ...cssBorderRadius(this.props.data.attributes.borderRadius),
          overflow: "hidden",
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
