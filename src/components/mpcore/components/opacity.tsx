import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class Opacity extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          opacity: this.props.data.attributes.opacity
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
