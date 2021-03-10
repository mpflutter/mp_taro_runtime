import { Component } from "react";
import React from "react";
import { AppContext } from "../../app_provider";
import { MPComponentsProps } from "../component";
import { View } from "@tarojs/components";

export class TabBar extends Component<{
  data: MPComponentsProps;
  nested?: boolean;
}> {
  static height = "50px";

  onTapIndex(App: any, index: number) {
    App?.callbackChannel(
      JSON.stringify({
        type: "tab_bar",
        message: {
          event: "onTapIndex",
          target: this.props.data.attributes.onTapIndex,
          data: index,
        },
      })
    );
  }

  render() {
    return (
      <AppContext.Consumer>
        {(App) => (
          <View
            style={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              top: "0px",
              left: "0px",
              right: "0px",
              height: "50px",
            }}
          >
            {this.props.data.children.map((it, idx) => {
              return (
                <View
                  onClick={() => this.onTapIndex(App, idx)}
                  style={{
                    height: "50px",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      flex: "1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "14px",
                      fontWeight:
                        idx === this.props.data.attributes.selected
                          ? "bold"
                          : "normal",
                    }}
                  >
                    {it.attributes.text}
                  </View>
                  <View
                    style={{
                      height: "2px",
                      backgroundColor: "rgb(31,128,240)",
                      visibility:
                        idx === this.props.data.attributes.selected
                          ? "visible"
                          : "hidden",
                    }}
                  ></View>
                </View>
              );
            })}
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}
