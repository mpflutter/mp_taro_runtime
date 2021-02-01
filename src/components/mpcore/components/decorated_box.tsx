import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssBorder } from "../utils/border";
import { cssColor, cssGradient } from "../utils/color";
import { cssBorderRadius, cssOffset } from "../utils/geometry";
import { flutterBase } from "../../app";
import { View } from "@tarojs/components";

export class DecoratedBox extends Component<{ data: MPComponentsProps }> {
  renderDecoration() {
    let output: any = {};
    if (this.props.data.attributes.color) {
      output["backgroundColor"] = cssColor(this.props.data.attributes.color);
    }
    if (this.props.data.attributes.image) {
      output["backgroundImage"] = `url("${(() => {
        if (this.props.data.attributes.image.src) {
          return this.props.data.attributes.image.src;
        } else if (this.props.data.attributes.image.assetName) {
          if (this.props.data.attributes.image.assetPkg) {
            return `${flutterBase}/assets/packages/${this.props.data.attributes.image.assetPkg}/${this.props.data.attributes.image.assetName}`;
          } else {
            return `${flutterBase}/assets/${this.props.data.attributes.image.assetName}`;
          }
        }
      })()}")`;
      output["backgroundSize"] = "contain";
    }
    if (this.props.data.attributes.decoration?.gradient) {
      if (output["backgroundImage"]) {
        output["backgroundImage"] =
          cssGradient(this.props.data.attributes.decoration.gradient) +
          "," +
          output["backgroundImage"];
      } else {
        output["background"] = cssGradient(
          this.props.data.attributes.decoration.gradient
        );
      }
    }
    if (this.props.data.attributes.decoration?.boxShadow?.[0]) {
      const shadow = this.props.data.attributes.decoration?.boxShadow?.[0];
      output["boxShadow"] = `${cssOffset(shadow.offset)?.dx}px ${
        cssOffset(shadow.offset)?.dy
      }px ${shadow.blurRadius}px ${shadow.spreadRadius}px ${cssColor(
        shadow.color
      )}`;
    }
    if (this.props.data.attributes.decoration?.borderRadius) {
      output = {
        ...output,
        ...cssBorderRadius(this.props.data.attributes.decoration.borderRadius),
      };
    }
    if (this.props.data.attributes.decoration?.border) {
      output = {
        ...output,
        ...cssBorder(this.props.data.attributes.decoration.border),
      };
    }
    return output;
  }

  render() {
    if (
      this.props.data.attributes.position === "DecorationPosition.foreground"
    ) {
      return (
        <View style={{ position: "relative" }}>
          {this.props.children}
          <View
            style={{
              position: "absolute",
              top: "0px",
              left: "0px",
              minWidth: "100%",
              minHeight: "100%",
              ...this.renderDecoration(),
            }}
          ></View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            display: "flex",
            minWidth: "-webkit-fill-available",
            minHeight: "100%",
            ...this.renderDecoration(),
          }}
        >
          {this.props.children}
        </View>
      );
    }
  }
}
