import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import {
  renderSliverGridDelegateWithFixedCrossAxisCount,
  renderSliverGridDelegateWithMaxCrossAxisExtent,
  renderSliverWaterfallDelegate,
} from "./grid_waterfall_layout";
import { cssConstraints } from "../utils/geometry";
import { View } from "@tarojs/components";

export class GridView extends Component<{ data: MPComponentsProps }> {
  render() {
    let constraints = cssConstraints(this.props.data.constraints);
    if (this.props.data.attributes.isRoot) {
      if (this.props.data.attributes.scrollDirection === "Axis.horizontal") {
        constraints.maxWidth = "unset";
      } else {
        constraints.maxHeight = "unset";
      }
    }
    return (
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          ...constraints,
          overflowX:
            this.props.data.attributes.scrollDirection === "Axis.horizontal"
              ? this.props.data.attributes.isRoot
                ? "unset"
                : "scroll"
              : "hidden",
          overflowY:
            this.props.data.attributes.scrollDirection !== "Axis.horizontal"
              ? this.props.data.attributes.isRoot
                ? "unset"
                : "scroll"
              : "hidden",
        }}
      >
        {(() => {
          if (
            this.props.data.attributes.gridDelegate?.classname ===
            "SliverGridDelegateWithFixedCrossAxisCount"
          ) {
            return renderSliverGridDelegateWithFixedCrossAxisCount(
              this.props.data.attributes.gridDelegate,
              this.props.data.attributes.padding,
              this.props.children as any[],
              {
                parentWidth: this.props.data.attributes.width
                  ? parseInt(this.props.data.attributes.width)
                  : undefined,
              }
            );
          } else if (
            this.props.data.attributes.gridDelegate?.classname ===
            "SliverGridDelegateWithMaxCrossAxisExtent"
          ) {
            return renderSliverGridDelegateWithMaxCrossAxisExtent(
              this.props.data.attributes.gridDelegate,
              this.props.data.attributes.padding,
              this.props.children as any[],
              {
                parentWidth: this.props.data.attributes.width
                  ? parseInt(this.props.data.attributes.width)
                  : undefined,
              }
            );
          } else if (
            this.props.data.attributes.gridDelegate?.classname ===
            "SliverWaterfallDelegate"
          ) {
            return renderSliverWaterfallDelegate(
              this.props.data.attributes.gridDelegate,
              this.props.data.attributes.padding,
              this.props.children as any[],
              {
                parentWidth: this.props.data.attributes.width
                  ? parseInt(this.props.data.attributes.width)
                  : undefined,
              }
            );
          } else {
            return [];
          }
        })()}
      </View>
    );
  }
}

export class SliverWaterfallItem extends Component<{
  data: MPComponentsProps;
}> {
  render() {
    return this.props.children;
  }
}
