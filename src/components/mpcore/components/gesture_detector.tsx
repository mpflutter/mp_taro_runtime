import { Component } from "react";
import React from "react";
import { App } from "../../app";
import { MPComponentsProps } from "../component";
import { DivContextProvider } from "./div_context";

export class GestureDetector extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextProvider
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
            : null
        }
        // style={{ display: "flex" }}
      >
        {this.props.children}
      </DivContextProvider>
    );
  }
}
