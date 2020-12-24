import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssColor } from "../utils/color";
import { DivContextProvider } from "./div_context";

export class ColoredBox extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
        style={{
          backgroundColor: cssColor(this.props.data.attributes.color)
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
