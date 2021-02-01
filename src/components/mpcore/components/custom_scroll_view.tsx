import { Component } from "react";
import React from "react";
import { cssConstraints } from "../utils/geometry";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class CustomScrollView extends Component<{ data: MPComponentsProps }> {
  render() {
    let constraints = cssConstraints(this.props.data.constraints);
    if (this.props.data.attributes.isRoot) {
      constraints.maxHeight = "unset";
    }

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          ...constraints,
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
