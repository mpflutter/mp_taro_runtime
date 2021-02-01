import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssPadding } from "../utils/geometry";
import { View } from "@tarojs/components";

export class Padding extends Component<{ data: MPComponentsProps }> {
  render() {
    if (this.props.data.attributes.isFull) {
      const thePadding = this.props.data.attributes.padding
        ? cssPadding(this.props.data.attributes.padding)
        : {};
      const paddingLeft = thePadding.paddingLeft
        ? parseInt(thePadding.paddingLeft)
        : 0;
      const paddingRight = thePadding.paddingRight
        ? parseInt(thePadding.paddingRight)
        : 0;
      const paddingTop = thePadding.paddingTop
        ? parseInt(thePadding.paddingTop)
        : 0;
      const paddingBottom = thePadding.paddingBottom
        ? parseInt(thePadding.paddingBottom)
        : 0;
      return (
        <View
          style={{
            ...cssPadding(this.props.data.attributes.padding),
            minWidth: `calc(100% - ${paddingLeft}px - ${paddingRight}px)`,
            minHeight: `calc(100% - ${paddingTop}px - ${paddingBottom}px)`,
          }}
        >
          {this.props.children}
        </View>
      );
    } else {
      return (
        <View style={{ ...cssPadding(this.props.data.attributes.padding) }}>
          {this.props.children}
        </View>
      );
    }
  }
}
