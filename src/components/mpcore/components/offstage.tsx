import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class Offstage extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          display: this.props.data.attributes.offstage ? "none" : "unset"
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
