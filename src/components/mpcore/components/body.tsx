import { Component } from "react";
import React from "react";
import { MPCore } from "../mpcore";
import { View } from "@tarojs/components";

export class Body extends Component<{ isListBody: boolean; data: any }> {
  render() {
    if (this.props.data.name === "constrained_box") {
      return MPCore.render(this.props.data.children[0]);
    }
    if (this.props.isListBody) {
      return (
        <View style={{ width: "100%", maxWidth: "100%" }}>
          {MPCore.render(this.props.data)}
        </View>
      );
    } else {
      return (
        <View style={{ width: "100%", height: "100%", maxWidth: "100%" }}>
          {MPCore.render(this.props.data)}
        </View>
      );
    }
  }
}
