import { Component } from "react";
import React from "react";
import { App } from "../../app";
import { MPComponentsProps } from "../component";
import { DivContextConsumer } from "./div_context";

export class GestureDetector extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <DivContextConsumer
        onClick={
          this.props.data.attributes.onTap
            ? () => {
                App.callbackChannel(
                  JSON.stringify({
                    type: "gesture_detector",
                    message: {
                      event: "onTap",
                      target: this.props.data.attributes.onTap
                    }
                  })
                );
              }
            : null
        }
      >
        {this.props.children}
      </DivContextConsumer>
    );
  }
}
