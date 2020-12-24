import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class AbsorbPointer extends Component<{
  data: MPComponentsProps;
}> {
  render() {
    return (
      <DivContextProvider
        style={{
          pointerEvents: this.props.data.attributes.absorbing
            ? "absorbing"
            : undefined,
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
