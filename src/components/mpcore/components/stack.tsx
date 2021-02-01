import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";
import { cssHeight, cssWidth } from "../utils/geometry";

export class Stack extends Component<{ data: MPComponentsProps }> {
  render() {
    
    return (
      <View
        style={{
          display: "flex",
          minWidth: this.props.data.attributes.minWidth ? cssWidth(this.props.data.attributes.minWidth) : undefined,
          minHeight: this.props.data.attributes.minHeight ? cssHeight(this.props.data.attributes.minHeight) : undefined,
          position: "relative",
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
