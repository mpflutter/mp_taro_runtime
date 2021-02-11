import { View } from "@tarojs/components";
import React from "react";
import { MPComponentsProps } from "./component";
import { MPCore } from "./mpcore";
import Taro from "@tarojs/taro";
import { App } from "../app";
import LRU from "lru";

export class TextMeasurer extends React.Component<
  {
    scaffold: MPComponentsProps;
  },
  { targetTexts: { [key: number]: MPComponentsProps }; targetHash: string }
> {
  static scanRichText(
    data: MPComponentsProps,
    result: { [key: number]: MPComponentsProps },
    resultHash: string[]
  ) {
    if (!data) return;
    if (data.name === "rich_text" && data.attributes.measureId) {
      result[data.attributes.measureId] = data;
      resultHash.push(data.attributes.measureId);
    } else {
      data.children?.forEach((it) => {
        this.scanRichText(it, result, resultHash);
      });
    }
  }

  state: {
    targetTexts: { [key: number]: MPComponentsProps };
    targetHash: string;
  } = {
    targetTexts: {},
    targetHash: "",
  };

  componentDidMount() {
    this.doScan(this.props);
  }

  componentWillReceiveProps(newProps: any) {
    this.doScan(newProps);
  }

  componentDidUpdate() {
    if (!Object.keys(this.state.targetTexts).length) return;
    setTimeout(() => {
      let data: any[] = [];
      Taro.createSelectorQuery()
        .selectAll(".text_measure_item")
        .fields({ size: true, id: true }, (res) => {
          data.push(
            ...res.map((it) => {
              const targetText = this.state.targetTexts[
                parseInt(it.id?.replace("text_measurer_", ""))
              ];
              if (targetText) {
                MeasureCache.instance.addCache(targetText, {
                  width: it.width,
                  height: it.height,
                });
              }
              return {
                measureId: parseInt(it.id?.replace("text_measurer_", "")),
                size: { width: it.width, height: it.height },
              };
            })
          );
          Object.values(this.state.targetTexts).forEach((targetText) => {
            const cache = MeasureCache.instance.getCache(targetText);
            if (cache) {
              data.push({
                measureId: targetText.attributes.measureId,
                size: cache,
              });
            }
          });
          App.callbackChannel(
            JSON.stringify({
              type: "rich_text",
              message: {
                event: "onMeasured",
                data: data,
              },
            })
          );
        })
        .exec();
    }, 0);
  }

  doScan(props: { scaffold: MPComponentsProps }) {
    let result: { [key: number]: MPComponentsProps } = {};
    let resultHash: string[] = [];
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.header,
      result,
      resultHash
    );
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.appBar,
      result,
      resultHash
    );
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.tabBar,
      result,
      resultHash
    );
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.body,
      result,
      resultHash
    );
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.bottomBar,
      result,
      resultHash
    );
    TextMeasurer.scanRichText(
      props.scaffold?.attributes?.floatingBody,
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
    if (!Object.keys(this.state.targetTexts).length) {
      return (
        <View
          key="text_measurer"
          style={{
            display: "contents",
          }}
        ></View>
      );
    }
    let sameKeys: { [key: string]: boolean } = {};
    return (
      <View
        key="text_measurer"
        style={{
          display: "contents",
        }}
      >
        {Object.values(this.state.targetTexts)
          .filter((it) => !MeasureCache.instance.getCache(it))
          .map((it) => {
            const itKey = MeasureCache.instance.makeKey(it);
            if (sameKeys[itKey] === true) {
              return null;
            }
            sameKeys[itKey] = true;
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

interface CacheSize {
  width: number;
  height: number;
}

class MeasureCache {
  static instance = new MeasureCache();

  _cacheInstance = new LRU(500);

  makeKey(item: MPComponentsProps): string {
    if (
      item.constraints?.maxWidth === "Infinity" &&
      item.children.length === 1 &&
      !item.children[0].children &&
      item.children[0].attributes?.text &&
      /[^\u4e00-\u9fa5]/.test(item.children[0].attributes.text) === false
    ) {
      // 纯中文
      return `chinese_${item.children[0].attributes.text.length}_${item.children[0].attributes?.style?.fontSize}_${item.attributes?.maxLines}_${item.attributes?.textAlign}`;
    }
    return `${item.constraints?.minWidth}_${item.constraints?.minHeight}_${
      item.constraints?.maxWidth
    }_${item.constraints?.maxHeight}_${JSON.stringify(item.children)}_${
      item.attributes?.maxLines
    }_${item.attributes?.textAlign}`;
  }

  addCache(item: MPComponentsProps, size: CacheSize) {
    this._cacheInstance.set(this.makeKey(item), size);
  }

  getCache(item: MPComponentsProps): CacheSize | undefined {
    return this._cacheInstance.get(this.makeKey(item));
  }
}
