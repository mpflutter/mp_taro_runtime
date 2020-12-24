import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextConsumer } from "./div_context";

export class Flex extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextConsumer
        style={{
          display: "flex",
          flexDirection: (() => {
            switch (this.props.data.attributes.direction) {
              case "Axis.vertical":
                return "column";
              case "Axis.horizontal":
                return "row";
              default:
                return "column";
            }
          })(),
          justifyContent: (() => {
            switch (this.props.data.attributes.mainAxisAlignment) {
              case "MainAxisAlignment.start":
                return "flex-start";
              case "MainAxisAlignment.center":
                return "center";
              case "MainAxisAlignment.end":
                return "flex-end";
              case "MainAxisAlignment.spaceBetween":
                return "space-between";
              case "MainAxisAlignment.spaceAround":
                return "space-around";
              case "MainAxisAlignment.spaceEvenly":
                return "space-evenly";
              default:
                return "flex-start";
            }
          })(),
          alignItems: (() => {
            switch (this.props.data.attributes.crossAxisAlignment) {
              case "CrossAxisAlignment.start":
                return "flex-start";
              case "CrossAxisAlignment.center":
                return "center";
              case "CrossAxisAlignment.end":
                return "flex-end";
              case "CrossAxisAlignment.stretch":
                return "stretch";
              default:
                return "flex-start";
            }
          })(),
          minWidth: (() => {
            if (
              this.props.data.attributes.direction === "Axis.horizontal" &&
              this.props.data.attributes.mainAxisSize === "MainAxisSize.max"
            ) {
              return "100%";
            }
          })(),
          minHeight: (() => {
            if (
              this.props.data.attributes.direction === "Axis.vertical" &&
              this.props.data.attributes.mainAxisSize === "MainAxisSize.max"
            ) {
              return "100%";
            }
          })()
        }}
      >
        {this.props.children}
      </DivContextConsumer>
    );
  }
}
