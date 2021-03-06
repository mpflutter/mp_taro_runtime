import { Component } from "react";
import React from "react";
import { AppContext } from "../../app_provider";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class GestureDetector extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <AppContext.Consumer>
        {(App) => (
          <View
            style={{}}
            hoverClass="mp_touch_opacity"
            onClick={
              this.props.data.attributes.onTap
                ? (e: any) => {
                    App?.callbackChannel(
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
        )}
      </AppContext.Consumer>
    );
  }
}
