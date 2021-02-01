import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import {
  renderSliverGridDelegateWithFixedCrossAxisCount,
  renderSliverGridDelegateWithMaxCrossAxisExtent,
  renderSliverWaterfallDelegate,
} from "./grid_waterfall_layout";
import { View } from "@tarojs/components";

export class GridView extends Component<{ data: MPComponentsProps }> {

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
