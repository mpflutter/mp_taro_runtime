import { Component } from "react";
import React from "react";
import { View } from "@tarojs/components";

export class ClipOval extends Component {
  render() {
    return (
      <View
        style={{
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
