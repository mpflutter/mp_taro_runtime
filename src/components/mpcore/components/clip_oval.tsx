import { Component } from "react";
import React from "react";
import { DivContextProvider } from "./div_context";

export class ClipOval extends Component {
  render() {
    return (
      <DivContextProvider
        style={{
          borderRadius: "50%",
          overflow: "hidden"
        }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
