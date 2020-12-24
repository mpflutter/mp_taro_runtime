import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class Visibility extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          visibility: this.props.data.attributes.visible ? "unset" : "hidden"
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
