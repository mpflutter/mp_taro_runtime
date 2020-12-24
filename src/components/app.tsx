import { Component } from "react";
import React from "react";
import ReactDOM from "react-dom";

import { Body } from "./mpcore/components/body";
import {
  DivContextProvider,
  DivContextConsumer,
} from "./mpcore/components/div_context";
import { MPCore } from "./mpcore/mpcore";
import { WebDialogs } from "./mpcore/components/web_dialogs";
import { cssColor } from "./mpcore/utils/color";

export let flutterBase = "./";
export const flutterFonts = [
  { name: "MaterialIcons", url: "MaterialIcons-Regular.otf" },
];

export class App extends Component<any, any> {
  static callbackChannel: (message: string) => void = () => {};

  state: any = {};
  lastFrameData: any;
  static isDialogDisplaying: boolean = false;
  static isListBody: boolean = false;

  componentDidMount() {
    if ((window as any).mpflutterUseSocket === 1) {
      this.setupDartChannel();
    } else {
      this.setupJSChannel();
    }
  }

  setupDartChannel() {
    flutterBase = `http://127.0.0.1:9898`;
  }

  setupJSChannel() {
    window.addEventListener("message", (event) => {
      try {
        const messageData = JSON.parse(event.data);
        if (messageData.type === "frame_data") {
          this.lastFrameData = messageData;
          this.setState({
            data: messageData.message,
          });
        } else if (messageData.type === "route") {
          Router.receivedRouteMessage(messageData.message);
        } else {
          MPCore.plugins.forEach((plugin) => {
            plugin.onMessage?.call(this, messageData);
          });
        }
      } catch (error) {}
    });
    this.setupFonts();
    this.setupPlugins();
    Router.setupPopStateListener();
    App.callbackChannel = (message) => {
      window.postMessage(message, "*");
    };
  }

  setupFonts() {
    if (typeof window !== "undefined") {
      flutterFonts.forEach((font) => {
        const style = document.createElement("style");
        style.innerHTML = `
        @font-face{
          font-family: '${font.name}';
          src: url('${flutterBase}/assets/fonts/${font.url}');
        }
        `;
        document.body.appendChild(style);
      });
    }
  }

  setupPlugins() {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.src = `${flutterBase}/assets/mp_plugins.js`;
      script.addEventListener("load", () => {
        this.setState({});
      });
      document.body.appendChild(script);
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = `${flutterBase}/assets/mp_plugins.css`;
      link.media = "all";
      document.head.appendChild(link);
    }
  }

  static setupBodyScrollBehavior() {
    // if (App.isDialogDisplaying) {
    //   document.body.style.setProperty("overflow", "hidden");
    // } else if (this.isListBody) {
    //   document.body.style.setProperty("overflow", "unset");
    // } else {
    //   document.body.style.setProperty("overflow", "hidden");
    // }
  }

  render() {
    App.isListBody = this.state.data?.isListBody === true;
    App.setupBodyScrollBehavior();
    return (
      <div
        id="app"
        style={{
          height: this.state.data?.isListBody === true ? "unset" : "100%",
          backgroundColor: this.state.data?.backgroundColor
            ? cssColor(this.state.data?.backgroundColor)
            : "unset",
        }}
      >
        {this.state.data?.header
          ? MPCore.render(this.state.data?.header)
          : null}
        {this.state.data?.tabBar ? MPCore.render(this.state.data.tabBar) : null}
        {this.state.data ? <Body data={this.state.data.body} /> : null}
      </div>
    );
  }

  static attachDialog(element: any, touchable: boolean = true) {
    this.isDialogDisplaying = true;
    if (touchable) {
      ReactDOM.render(
        <div style={{ pointerEvents: "auto" }}>{element}</div>,
        document.getElementById("mp_dialog")
      );
    } else {
      ReactDOM.render(element, document.getElementById("mp_dialog"));
    }
    App.setupBodyScrollBehavior();
  }

  static detachDialog() {
    this.isDialogDisplaying = false;
    ReactDOM.unmountComponentAtNode(document.getElementById("mp_dialog")!);
    App.setupBodyScrollBehavior();
  }
}

class Router {
  static setupPopStateListener() {
    if (window) {
      window.addEventListener("popstate", (e) => {
        if (this.doBacking) {
          return true;
        }
        App.callbackChannel(
          JSON.stringify({
            type: "router",
            message: {
              event: "doPop",
            },
          })
        );
      });
    }
  }

  static receivedRouteMessage(message: any) {
    if (message.event === "didPush") {
      this.didPush(message);
    } else if (message.event === "didPop") {
      this.didPop();
    }
  }

  static didPush(message: any) {
    if (window) {
      window.history.pushState(
        message.route,
        "",
        `/?route=${message.route.name}`
      );
    }
  }

  static doBacking = false;

  static didPop() {
    if (window) {
      this.doBacking = true;
      window.history.back();
      this.doBacking = false;
    }
  }
}

if (typeof window !== "undefined") {
  (window as any).$MPFlutter = {
    MPCore,
    DivContextProvider,
    DivContextConsumer,
    App,
  };
  (window as any).React = React;
  (window as any).ReactDOM = ReactDOM;
}

export default App;
