import { Component } from "react";
import { MPComponentsProps } from "../component";
import React from "react";

export class MPWebView extends Component<{ data: MPComponentsProps }> {
  render() {
    return (
      <iframe
        title="mp_web_view"
        src={this.props.data.attributes.url}
        style={{ width: "100%", height: "100%", border: "none" }}
      ></iframe>
    );
  }
}
