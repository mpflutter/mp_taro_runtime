import { Component } from "react";
import React from "react";
import { App } from "../../app";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class GestureDetector extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <View
        style={{}}
        onClick={
          this.props.data.attributes.onTap
            ? (e: any) => {
                App.callbackChannel(
                  JSON.stringify({
                    type: "gesture_detector",
                    message: {
                      event: "onTap",
                      target: this.props.data.attributes.onTap,
                    },
                  })
                );
                e.stopPropagation();
              }
            : undefined
        }
      >
        {this.props.children}
      </View>
    );
  }
}
