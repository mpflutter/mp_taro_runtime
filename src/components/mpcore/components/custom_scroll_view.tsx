import { Component } from "react";
import React from "react";
import { View } from "@tarojs/components";

export class CustomScrollView extends Component {

  render() {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          minWidth: "100%",
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
