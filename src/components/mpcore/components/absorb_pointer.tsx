import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextConsumer } from "./div_context";

export class AbsorbPointer extends Component<{
  data: MPComponentsProps;
}> {
  render() {
    return (
      <DivContextConsumer
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        {this.props.children}
      </DivContextConsumer>
    );
  }
}
