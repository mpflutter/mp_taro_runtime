import { Component } from "react";
import React from "react";
import { App } from "../../app";
import { MPComponentsProps } from "../component";

export class TabBar extends Component<{
  data: MPComponentsProps;
  nested?: boolean;
}> {
  static height = "50px";

  onTapIndex(index: number) {
    App.callbackChannel(
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
    const nested = this.props.nested;
    return (
      <div
        style={
          nested
            ? {
                backgroundColor: "white",
                position: "sticky",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                top: "0px",
                left: "0px",
                right: "0px",
                height: "50px",
              }
            : {
                backgroundColor: "white",
                position: "fixed",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                top: "0px",
                left: "0px",
                right: "0px",
                height: "50px",
              }
        }
      >
        {this.props.data.children.map((it, idx) => {
          return (
            <div
              onClick={() => this.onTapIndex(idx)}
              style={{
                height: "50px",
                flex: "1",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
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
              </div>
              <div
                style={{
                  height: "2px",
                  backgroundColor: "rgb(31,128,240)",
                  visibility:
                    idx === this.props.data.attributes.selected
                      ? "visible"
                      : "hidden",
                }}
              ></div>
            </div>
          );
        })}
      </div>
    );
  }
}
