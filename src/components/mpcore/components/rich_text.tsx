import { Component } from "react";
import React from "react";
import { MPComponentsProps } from "../component";
import { cssTextAlign, cssTextStyle } from "../utils/text";
import { MPCore } from "../mpcore";
import { View, RichText as TaroRichText } from "@tarojs/components";

export class RichText extends Component<{ data: MPComponentsProps }> {
  render() {
    let style = {};
    if (this.props.data.attributes.maxLines) {
      style = {
        ...style,
        ...{
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: cssTextAlign(this.props.data.attributes.textAlign),
          display: "-webkit-box",
          WebkitLineClamp: this.props.data.attributes.maxLines.toString(),
          "-webkit-line-clamp": this.props.data.attributes.maxLines.toString(),
          WebkitBoxOrient: "vertical",
          "-webkit-box-orient": "vertical",
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
        ...style,
        ...{
          overflow: "hidden",
          textOverflow: "ellipsis",
          textAlign: cssTextAlign(this.props.data.attributes.textAlign),
          display: "-webkit-box",
          WebkitLineClamp: "99999",
          "-webkit-line-clamp": "99999",
          WebkitBoxOrient: "vertical",
          "-webkit-box-orient": "vertical",
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
      <View style={style}>
        <TaroRichText nodes={content} />
      </View>
    );
    // return (
    //   <DivContextConsumer style={style}>
    //     {this.props.data.children?.map((it, idx) => {
    //       return jsxComponentFromSpan(it, idx);
    //     })}
    //   </DivContextConsumer>
    // );
  }
}

const jsxComponentFromSpan = (it: any, idx: number) => {
  if (it.name === "text_span") {
    return TextSpan.render(it);
    // return <TextSpan key={`idx_${idx}`} data={it} />;
  } else if (it.name === "widget_span") {
    return ``;
    // return <WidgetSpan key={`idx_${idx}`} data={it} />;
  } else {
    return ``;
    // return null;
  }
};

export class TextSpan extends Component<any> {
  static render(data: any) {
    if (!data.attributes.text && data.children) {
      return data.children
        .map((it, idx) => jsxComponentFromSpan(it, idx))
        .join("");
    } else {
      return `<span style="${cssTextStyle(data.attributes.style)}">${
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
