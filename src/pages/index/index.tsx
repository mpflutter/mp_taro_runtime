import React, { Component } from "react";
import Taro from "@tarojs/taro";
import "./index.scss";

import { MPCore } from "../../components/mpcore/mpcore";
import { cssColor } from "../../components/mpcore/utils/color";
import { View } from "@tarojs/components";
import { ScrollListener } from "../..//components/mpcore/scroll_listener";
import { Router } from "../../components/app";
import { TextMeasurer } from "../../components/mpcore/text_measurer";

export default class Index extends Component {
  isShowed = false;
  state: { routeId?: string; data?: any } = {};

  componentDidMount() {
    const routeId = Router.lastPushingRouteId ?? '0';
    this.setState({
      routeId,
    });
    Router.instance.routes[routeId].on("data-changed", (data) => {
      this.setState({ data: data });
      this.resetNavigationTitle();
    });
    this.setState({ data: Router.instance.routes[routeId].data });
  }

  componentDidShow() {
    if (this.state.routeId) {
      Router.triggerPop(this.state.routeId);
    }
    this.isShowed = true;
    this.resetNavigationTitle();
  }

  componentDidHide() {
    this.isShowed = false;
  }

  resetNavigationTitle() {
    if (!this.isShowed) return;
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
