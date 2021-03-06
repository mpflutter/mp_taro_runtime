import { Component } from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints } from "../utils/geometry";
import { Swiper, SwiperItem, View } from "@tarojs/components";
import React from "react";

export class MPPageView extends Component<{ data: MPComponentsProps }> {
  render() {
    if ((this.props.children as any[])?.length === 1) {
      return (
        <View
          style={{
            ...cssConstraints(this.props.data.constraints),
          }}
        >
          {this.props.children}
        </View>
      );
    }
    return (
      <Swiper
        style={{
          ...cssConstraints(this.props.data.constraints),
        }}
        vertical={
          this.props.data.attributes.scrollDirection === "Axis.vertical"
        }
        circular={this.props.data.attributes.loop}
      >
        {(this.props.children as any[]).map((it, idx) => {
          return (
            <SwiperItem
              key={`swiper-slide-${idx}`}
              style={{ display: "flex", width: "100%", height: "100%" }}
            >
              {it}
            </SwiperItem>
          );
        })}
      </Swiper>
    );
  }
}
