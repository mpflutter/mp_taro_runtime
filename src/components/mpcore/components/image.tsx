import { Component } from "react";
import React from "react";
import { flutterBase } from "../../app";
import { MPComponentsProps } from "../component";
import { DivContextConsumer } from "./div_context";
import { Image as TaroImage } from "@tarojs/components";

export class Image extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextConsumer
        el={TaroImage}
        style={{
          display: "flex",
          minWidth: "100%",
          minHeight: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
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
        mode={(() => {
          if (!this.props.data.attributes.fit) return "aspectFill";
          switch (this.props.data.attributes.fit) {
            case "BoxFit.fill":
              return "scaleToFill";
            case "BoxFit.contain":
              return "aspectFit";
            case "BoxFit.cover":
              return "aspectFill";
            case "BoxFit.fitWidth":
              return "widthFix";
            case "BoxFit.fitHeight":
              return "heightFix";
            case "BoxFit.none":
              return "none";
            default:
              return "aspectFit";
          }
        })()}
      ></DivContextConsumer>
    );
  }
}
