import { Component } from "react";
import { MPComponentsProps } from "../component";
import { cssColor } from "../utils/color";
import { cssHeight } from "../utils/geometry";
import React from "react";

export class Divider extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <div
        style={{
          display: "flex",
          minWidth: "100%",
          minHeight: cssHeight(this.props.data.attributes.height),
          maxWidth: "100%",
          maxHeight: cssHeight(this.props.data.attributes.height),
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            minWidth: "100%",
            minHeight: cssHeight(this.props.data.attributes.thickness),
            maxWidth: "100%",
            maxHeight: cssHeight(this.props.data.attributes.thickness),
            borderTopWidth: cssHeight(
              this.props.data.attributes.thickness,
              true
            ),
            borderTopStyle: "solid",
            borderTopColor: cssColor(this.props.data.attributes.color),
          }}
        ></div>
      </div>
    );
  }
}
