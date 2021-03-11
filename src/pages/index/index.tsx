import React, { Component } from "react";
import Taro from "@tarojs/taro";

import { MPCore } from "../../components/mpcore/mpcore";
import { cssColor } from "../../components/mpcore/utils/color";
import { View } from "@tarojs/components";
import { ScrollListener } from "../..//components/mpcore/scroll_listener";
import App, { Router } from "../../components/app";
import { AppContext } from "../../components/app_provider";
import { TextMeasurer } from "../../components/mpcore/text_measurer";
import { Overlay } from "../..//components/mpcore/components/overlay";

export default class Index extends Component {
  isShowed = false;
  state: { routeId?: string; data?: any } = {};

  async componentDidMount() {
    await App.instance.start();
    let routeId = Router.lastPushingRouteId ?? "0";
    if (routeId === "0" && Taro.getCurrentPages().length > 1) {
      Router.lastPageReplacing = true;
      App.callbackChannel(
        JSON.stringify({
          type: "router",
          message: {
            event: "doPush",
            name: decodeURIComponent(
              Taro.getCurrentInstance()?.router?.params?.route ?? "/"
            ),
          },
        })
      );
      return;
    }
    Router.lastPushingRouteId = undefined;
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
    ScrollListener.instance.setApp(App);
    ScrollListener.instance.onReachBottom();
  }

  render() {
    return (
      <AppContext.Provider value={App}>
        <View
          style={{
            width: "100vw",
            height: this.state.data?.isListBody === true ? "unset" : "100vh",
            backgroundColor: this.state.data?.backgroundColor
              ? cssColor(this.state.data?.backgroundColor)
              : "unset",
          }}
        >
          {this.state.data?.mainTabBar ? (
            <View style={{ display: "flex", flexDirection: "column" }}>
              {MPCore.render(this.state.data?.scaffold)}
              <View
                style={{
                  position: "sticky",
                  bottom: "0px",
                  zIndex: 1,
                  opacity: "0",
                }}
              >
                {MPCore.render(this.state.data?.mainTabBar)}
              </View>
              <View style={{ position: "fixed", bottom: "0px", zIndex: 1 }}>
                {MPCore.render(this.state.data?.mainTabBar)}
              </View>
            </View>
          ) : (
            MPCore.render(this.state.data?.scaffold)
          )}
          {this.state.data?.overlays?.length > 0
            ? this.state.data.overlays.map((it: any, index: number) => (
                <Overlay key={`overlay_${index}`} data={it} />
              ))
            : null}
          <TextMeasurer scaffold={this.state.data?.scaffold} />
        </View>
      </AppContext.Provider>
    );
  }
}
