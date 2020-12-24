import { View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import React from "react";
import { Component } from "react";
import "./app.scss";
import { Route, Router } from "./router";
import { App as FlutterApp } from "./components/app";

class App extends Component {
  componentDidMount() {
    Router.instance.startApp(new Route());
    this.setupDartChannel();
  }

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  private setupDartChannel() {
    Taro.connectSocket({
      url: "ws://10.0.1.22:9898/",
    });
    Taro.onSocketOpen(() => {});
    Taro.onSocketClose(() => {
      setTimeout(() => {
        this.setupDartChannel();
      }, 1000);
    });
    Taro.onSocketMessage((res) => {
      const messageData = JSON.parse(res.data);
      if (messageData.type === "frame_data") {
        Router.instance.routes[0].update(messageData.message);
      }
    });
    FlutterApp.callbackChannel = (message) => {
      Taro.sendSocketMessage({
        data: message,
      });
    };
  }

  render() {
    return this.props.children;
  }
}

export default App;
