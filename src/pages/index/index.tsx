import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";

import { MPCore } from "../../components/mpcore/mpcore";
import { cssColor } from "../../components/mpcore/utils/color";
import { View } from "@tarojs/components";
import { ScrollListener } from "../..//components/mpcore/scroll_listener";
import { getCurrentInstance } from "@tarojs/taro";
import { Router } from "../../components/app";
import { TextMeasurer } from "../../components/mpcore/text_measurer";

export default class Index extends Component {
  isShowed = false;
  state: { routeIndex?: number; data?: any } = {};

  componentDidMount() {
    const routeIndex = getCurrentInstance().router?.params?.routeIndex ?? 0;
    this.setState({
      routeIndex,
    });
    Router.instance.routes[routeIndex].on("data-changed", (data) => {
      this.setState({ data: data });
      this.resetNavigationTitle();
    });
    this.setState({ data: Router.instance.routes[routeIndex].data });
  }

  componentDidShow() {
    const routeIndex = getCurrentInstance().router?.params?.routeIndex ?? 0;
    if (routeIndex < Router.instance.routes.length - 1) {
      Router.triggerPop();
    }
    this.isShowed = true;
    this.resetNavigationTitle();
  }

  componentDidHide() {
    this.isShowed = false;
  }

  resetNavigationTitle() {
    if (!this.isShowed) return;
    const routeIndex = getCurrentInstance().router?.params?.routeIndex ?? 0;
    if (routeIndex < Router.instance.routes.length - 1) {
      return;
    }
    Taro.setNavigationBarTitle({
      title: this.state.data?.scaffold?.attributes?.name ?? "",
    });
  }

  onReachBottom() {
    ScrollListener.instance.onReachBottom();
  }

  render() {
    return (
      <View
        style={{
          width: "100vw",
          height: this.state.data?.isListBody === true ? "unset" : "100vh",
          backgroundColor: this.state.data?.backgroundColor
            ? cssColor(this.state.data?.backgroundColor)
            : "unset",
        }}
      >
        {MPCore.render(this.state.data?.scaffold)}
        <TextMeasurer scaffold={this.state.data?.scaffold} />
      </View>
    );
  }
}
