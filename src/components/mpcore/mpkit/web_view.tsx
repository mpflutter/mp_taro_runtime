import { WebView } from "@tarojs/components";
import React from "react";
import { Component } from "react";
import { MPComponentsProps } from "../component";
// import { cssConstraints } from "../utils/geometry";

export class MPWebView extends Component<{ data: MPComponentsProps }> {
  render() {
    return <WebView src={this.props.data.attributes.url}></WebView>;
  }
}
