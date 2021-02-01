import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Align extends Component<{ data: MPComponentsProps }> {
  alignStyles() {
    let alignments = this.props.data.attributes.alignment;
    let justifyContent;
    if (
      alignments === "bottomLeft" ||
      alignments === "centerLeft" ||
      alignments === "topLeft"
    ) {
      justifyContent = "flex-start";
    } else if (
      alignments === "bottomCenter" ||
      alignments === "center" ||
      alignments === "topCenter"
    ) {
      justifyContent = "center";
    } else if (
      alignments === "bottomRight" ||
      alignments === "centerRight" ||
      alignments === "topRight"
    ) {
      justifyContent = "flex-end";
    }
    let alignItems;
    if (
      alignments === "topCenter" ||
      alignments === "topLeft" ||
      alignments === "topRight"
    ) {
      alignItems = "flex-start";
    } else if (
      alignments === "centerLeft" ||
      alignments === "center" ||
      alignments === "centerRight"
    ) {
      alignItems = "center";
    } else if (
      alignments === "bottomCenter" ||
      alignments === "bottomLeft" ||
      alignments === "bottomRight"
    ) {
      alignItems = "flex-end";
    }
    return { display: "flex", flexDirection: "row", justifyContent, alignItems };
  }

  render() {
    return (
      <View
        style={{
          ...cssConstraints(this.props.data.constraints),
          ...this.alignStyles(),
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
