import { Component } from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";
import React from "react";

export class SliverPersistentHeader extends Component<{
  data: MPComponentsProps;
}> {
  render() {
    return (
      <View
        style={{
          position: "sticky",
          top: "-1px",
          zIndex: 1,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
