import { Component } from "react";
import React from "react";
import { View } from "@tarojs/components";

export class Div extends Component {
  render() {
    return <View style={{ display: "contents" }}>{this.props.children}</View>;
  }
}
