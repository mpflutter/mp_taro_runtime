import { Component } from "react";
import React from "react";
import { flutterBase } from "../../app";
import { MPComponentsProps } from "../component";
import { DivContextConsumer } from "./div_context";

export class Image extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextConsumer
        el="img"
        style={{
          display: "flex",
          minWidth: "100%",
          maxWidth: "100%",
          minHeight: "100%",
          maxHeight: "100%",
          objectFit: (() => {
            if (!this.props.data.attributes.fit) return "cover";
            switch (this.props.data.attributes.fit) {
              case "BoxFit.fill":
                return "fill";
              case "BoxFit.contain":
                return "contain";
              case "BoxFit.cover":
                return "cover";
              case "BoxFit.fitWidth":
                return "scale-down";
              case "BoxFit.fitHeight":
                return "scale-down";
              case "BoxFit.none":
                return "none";
              default:
                return "contain";
            }
          })()
        }}
        src={(() => {
          if (this.props.data.attributes.src) {
            return this.props.data.attributes.src;
          } else if (this.props.data.attributes.assetName) {
            if (this.props.data.attributes.assetPkg) {
              return `${flutterBase}/assets/packages/${this.props.data.attributes.assetPkg}/${this.props.data.attributes.assetName}`;
            } else {
              return `${flutterBase}/assets/${this.props.data.attributes.assetName}`;
            }
          }
        })()}
      ></DivContextConsumer>
    );
  }
}
