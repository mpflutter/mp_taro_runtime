import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssColor } from "../utils/color";
import { cssConstraints, cssWidth } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Icon extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          ...cssConstraints(this.props.data.constraints),
          fontFamily: this.props.data.attributes.icon?.fontFamily,
          color:
            this.props.data.attributes.color &&
            cssColor(this.props.data.attributes.color),
          fontSize: cssWidth(this.props.data.attributes.size),
        }}
      >
        {this.props.data.attributes.icon?.codePoint
          ? String.fromCharCode(this.props.data.attributes.icon?.codePoint)
          : ""}
      </View>
    );
  }
}
