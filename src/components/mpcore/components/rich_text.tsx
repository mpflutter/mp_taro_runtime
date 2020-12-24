import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssTextStyle } from "../utils/text";
import { DivContextConsumer } from "./div_context";
import { Text } from "@tarojs/components";

export class RichText extends Component<{ data: MPComponentsProps }> {
  render() {
    let style = {};
    if (this.props.data.attributes.maxLines) {
      style = {
        ...style,
        ...{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: this.props.data.attributes.maxLines.toString(),
          WebkitBoxOrient: "vertical",
          fontSize: "11px",
        },
      };
    }
    return (
      <DivContextConsumer style={style}>
        {this.props.data.children?.map((it, idx) => {
          return jsxComponentFromSpan(it, idx);
        })}
      </DivContextConsumer>
    );
  }
}

const jsxComponentFromSpan = (it: any, idx: number) => {
  if (it.name === "text_span") {
    return <TextSpan key={`idx_${idx}`} data={it} />;
  } else {
    return null;
  }
};

export class TextSpan extends Component<any> {
  render() {
    return (
      <Text style={cssTextStyle(this.props.data.attributes.style)}>
        {this.props.data.attributes.text ??
          this.props.data.children?.map((it: any, idx: number) => {
            return jsxComponentFromSpan(it, idx);
          })}
      </Text>
    );
  }
}
