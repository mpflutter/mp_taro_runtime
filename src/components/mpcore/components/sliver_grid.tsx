import { Component } from "react";
import React from "react";
import {
  renderSliverGridDelegateWithFixedCrossAxisCount,
  renderSliverGridDelegateWithMaxCrossAxisExtent,
  renderSliverWaterfallDelegate,
} from "./grid_waterfall_layout";
import { MPComponentsProps } from "../component";
// import { cssPadding } from "../utils/geometry";
import { View } from "@tarojs/components";

export class SliverGrid extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{
          display: "flex",
          flexWrap: "wrap",
          minWidth: "100%",
        }}
      >
        {(() => {
          // const gridViewPadding = this.props.data.attributes.padding
          //   ? cssPadding(this.props.data.attributes.padding)
          //   : {};
          // const paddingLeft = gridViewPadding.paddingLeft
          //   ? parseInt(gridViewPadding.paddingLeft)
          //   : 0;
          // const paddingRight = gridViewPadding.paddingRight
          //   ? parseInt(gridViewPadding.paddingRight)
          //   : 0;
          if (
            this.props.data.attributes.gridDelegate?.classname ===
            "SliverGridDelegateWithFixedCrossAxisCount"
          ) {
            return renderSliverGridDelegateWithFixedCrossAxisCount(
              this.props.data.attributes.gridDelegate,
              undefined,
              this.props.children as any[],
              {
                parentWidth: parseInt(this.props.data.attributes.width),
              }
            );
          } else if (
            this.props.data.attributes.gridDelegate?.classname ===
            "SliverGridDelegateWithMaxCrossAxisExtent"
          ) {
            return renderSliverGridDelegateWithMaxCrossAxisExtent(
              this.props.data.attributes.gridDelegate,
              undefined,
              this.props.children as any[],
              {
                parentWidth: parseInt(this.props.data.attributes.width),
              }
            );
          } else if (
            this.props.data.attributes.gridDelegate?.classname ===
            "SliverWaterfallDelegate"
          ) {
            return renderSliverWaterfallDelegate(
              this.props.data.attributes.gridDelegate,
              undefined,
              this.props.children as any[],
              {
                parentWidth: parseInt(this.props.data.attributes.width),
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
