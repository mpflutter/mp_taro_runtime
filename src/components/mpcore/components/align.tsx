import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { DivContextConsumer } from "./div_context";

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

    if (this.props.data.children?.[0].name === "flex") {
      alignItems = "stretch";
    }
    return { display: "flex", justifyContent, alignItems };
  }

  render() {
    return (
      <DivContextConsumer
        style={{
          minWidth: "100%",
          minHeight: "100%",
          ...this.alignStyles()
        }}
      >
        {this.props.children}
      </DivContextConsumer>
    );
  }
}
