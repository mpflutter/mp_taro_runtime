import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class Flexible extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          display: "flex",
          flex: this.props.data.attributes.flex
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
