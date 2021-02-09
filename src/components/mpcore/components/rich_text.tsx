import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssTextAlign, cssTextStyleString } from "../utils/text";
import { MPCore } from "../mpcore";
import { cssConstraints } from "../utils/geometry";
import { View, RichText as TaroRichText } from "@tarojs/components";

export class RichText extends Component<{ data: MPComponentsProps }> {
  shouldComponentUpdate(nextProps: { data: MPComponentsProps }) {
    if (nextProps.data.attributes.measureId) {
      return false;
    }
    return true;
  }

  render() {
    let style = {};
    let constraints = cssConstraints(this.props.data.constraints);
    if (constraints.minWidth === "100%") {
      constraints.minWidth = "unset";
    }
    if (constraints.minHeight === "100%") {
      constraints.minHeight = "unset";
    }
    if (this.props.data.constraints?.measuring) {
      constraints.minWidth = "unset";
      constraints.minHeight = "unset";
    }
    if (this.props.data.attributes.maxLines) {
      style = {
        ...constraints,
        ...style,
        ...{
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: cssTextAlign(this.props.data.attributes.textAlign),
          display: "-webkit-box",
          '-webkit-line-clamp': this.props.data.attributes.maxLines.toString(),
          '-webkit-box-orient': "vertical",
          fontSize: "11px",
          overflowWrap: "anywhere",
          wordBreak: "break-all",
          wordWrap: "break-word",
          whiteSpace: "pre-line",
          inlineSize:
            this.props.data.attributes.inline === true
              ? "max-content"
              : undefined,
        },
      };
    } else {
      style = {
        ...constraints,
        ...style,
        ...{
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: cssTextAlign(this.props.data.attributes.textAlign),
          display: "-webkit-box",
          '-webkit-line-clamp': "99999",
          '-webkit-box-orient': "vertical",
          fontSize: "11px",
          overflowWrap: "anywhere",
          wordBreak: "break-all",
          wordWrap: "break-word",
          whiteSpace: "pre-line",
          inlineSize:
            this.props.data.attributes.inline === true
              ? "max-content"
              : undefined,
        },
      };
    }
    const content = this.props.data.children
      ?.map((it, idx) => {
        return jsxComponentFromSpan(it, idx);
      })
      .join("");
    return (
      <TaroRichText nodes={content} style={style} />
    );
  }
}

const jsxComponentFromSpan = (it: any, _: number) => {
  if (it.name === "text_span") {
    return TextSpan.render(it);
  } else if (it.name === "widget_span") {
    return ``;
  } else {
    return ``;
  }
};

export class TextSpan extends Component<any> {
  static render(data: any) {
    if (!data.attributes.text && data.children) {
      return data.children
        .map((it, idx) => jsxComponentFromSpan(it, idx))
        .join("");
    } else {
      return `<span style="${cssTextStyleString(data.attributes.style)}">${
        data.attributes.text
      }</span>`;
    }
  }
}

export class WidgetSpan extends Component<any> {
  render() {
    return (
      <View style={{ display: "inline-flex" }}>
        {this.props.data.children.map((it: any, idx: number) =>
          MPCore.render(it, `ws_child_${idx}`)
        )}
      </View>
    );
  }
}