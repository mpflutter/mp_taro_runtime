import { View } from "@tarojs/components";
import React from "react";
import { MPComponentsProps } from "./component";
import { MPCore } from "./mpcore";
import Taro from "@tarojs/taro";
import { App } from "../app";

export class TextMeasurer extends React.Component<
  {
    scaffold: MPComponentsProps;
  },
  { targetTexts: MPComponentsProps[]; targetHash: string }
> {
  static scanRichText(
    data: MPComponentsProps,
    result: MPComponentsProps[],
    resultHash: string[]
  ) {
    if (!data) return;
    if (data.name === "rich_text" && data.attributes.measureId) {
      result.push(data);
      resultHash.push(data.attributes.measureId);
    } else {
      data.children?.forEach((it) => {
        this.scanRichText(it, result, resultHash);
      });
    }
  }

  state: { targetTexts: MPComponentsProps[]; targetHash: string } = {
    targetTexts: [],
    targetHash: "",
  };

  componentDidMount() {
    this.doScan(this.props);
  }

  componentWillReceiveProps(newProps: any) {
    this.doScan(newProps);
  }

  componentDidUpdate() {
    if (!this.state.targetTexts.length) return;
    Taro.createSelectorQuery()
      .selectAll(".text_measure_item")
      .fields({ size: true, id: true }, (res) => {
        App.callbackChannel(
          JSON.stringify({
            type: "rich_text",
            message: {
              event: "onMeasured",
              data: res.map((it) => {
                return {
                  measureId: parseInt(it.id?.replace("text_measurer_", "")),
                  size: { width: it.width, height: it.height },
                };
              }),
            },
          })
        );
      })
      .exec();
  }

  doScan(props: { scaffold: MPComponentsProps }) {
    let result: MPComponentsProps[] = [];
    let resultHash: string[] = [];
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.body,
      result,
      resultHash
    );
    let targetHash = resultHash.join(",");
    if (targetHash === this.state.targetHash) {
      return;
    }
    this.setState({
      targetTexts: result,
      targetHash,
    });
  }

  render() {
    if (!this.state.targetTexts.length) {
      return null;
    }
    return (
      <View
        style={{
          display: "contents",
        }}
      >
        {this.state.targetTexts.map((it) => {
          if (it.constraints) {
            it.constraints.measuring = true;
          }
          return (
            <View
              key={`text_measurer_${it.attributes.measureId}`}
              id={`text_measurer_${it.attributes.measureId}`}
              className="text_measure_item"
              style={{
                position: "absolute",
                left: "0px",
                top: "-9999px",
                opacity: 0,
                zIndex: -9999,
                pointerEvents: "none",
              }}
            >
              {MPCore.render(it)}
            </View>
          );
        })}
      </View>
    );
  }
}
