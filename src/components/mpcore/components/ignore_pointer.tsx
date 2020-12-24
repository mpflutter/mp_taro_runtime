import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class IgnorePointer extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          pointerEvents: this.props.data.attributes.ignoring
            ? "none"
            : undefined
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
