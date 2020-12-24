import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class Transform extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          transform: this.props.data.attributes.transform
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
