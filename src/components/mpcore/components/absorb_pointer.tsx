import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class AbsorbPointer extends Component<{
  data: MPComponentsProps;
}> {
  render() {
    return (
      <View
        style={{}}
        onClick={(e: any) => {
          e.stopPropagation();
        }}
      >
        {this.props.children}
      </View>
    );
  }
}
