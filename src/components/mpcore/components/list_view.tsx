import { Component } from "react";
import { MPComponentsProps } from "../component";
import { cssPadding } from "../utils/geometry";
import { DivContextConsumer } from "./div_context";
import React from "react";
import { View } from "@tarojs/components";

export class ListView extends Component<{ data: MPComponentsProps }> {
  render() {    
    const listViewPadding = this.props.data.attributes.padding
      ? cssPadding(this.props.data.attributes.padding)
      : {};
    const paddingLeft = listViewPadding.paddingLeft
      ? parseInt(listViewPadding.paddingLeft)
      : 0;
    const paddingRight = listViewPadding.paddingRight
      ? parseInt(listViewPadding.paddingRight)
      : 0;
    const paddingTop = listViewPadding.paddingTop
      ? parseInt(listViewPadding.paddingTop)
      : 0;
    const paddingBottom = listViewPadding.paddingBottom
      ? parseInt(listViewPadding.paddingBottom)
      : 0;
    return (
      <DivContextConsumer>
        <View
          style={{
            display: "flex",
            flexDirection:
              this.props.data.attributes.scrollDirection === "Axis.horizontal"
                ? "row"
                : "column",
            justifyContent: "flex-start",
            alignItems: "stretch",
            minWidth:
              this.props.data.attributes.scrollDirection !== "Axis.horizontal"
                ? `calc(100% - ${paddingLeft}px - ${paddingRight}px)`
                : "unset",
            minHeight:
              this.props.data.attributes.scrollDirection === "Axis.horizontal"
                ? `calc(100% - ${paddingTop}px - ${paddingBottom}px)`
                : "unset",
            ...cssPadding(this.props.data.attributes.padding),
          }}
        >
          {this.props.children}
        </View>
      </DivContextConsumer>
    );
  }
}
