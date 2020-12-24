import React, { Component } from "react";
import "./index.scss";
import { Router } from "../../router";

import { Body } from "../../components/mpcore/components/body";
import { MPCore } from "../../components/mpcore/mpcore";
import { cssColor } from "../../components/mpcore/utils/color";
import { View } from "@tarojs/components";

export default class Index extends Component {
  state: { data?: any } = {};

  componentDidMount() {
    Router.instance.routes[0].addListener("data-changed", (data) => {
      this.setState({ data: data });
    });
    this.setState({ data: Router.instance.routes[0].data });
  }

  render() {
    return (
      <View
        // id="app"
        style={{
          width: "100vw",
          height: this.state.data?.isListBody === true ? "unset" : "100vh",
          backgroundColor: this.state.data?.backgroundColor
            ? cssColor(this.state.data?.backgroundColor)
            : "unset",
        }}
      >
        {/* {this.state.data?.header
          ? MPCore.render(this.state.data?.header)
          : null}
        {this.state.data?.tabBar ? MPCore.render(this.state.data.tabBar) : null} */}
        {this.state.data ? <Body isListBody={this.state.data?.isListBody} data={this.state.data.body} /> : null}
      </View>
    );
  }
}
