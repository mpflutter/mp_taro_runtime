import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class Transform extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          transform: this.props.data.attributes.transform,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
