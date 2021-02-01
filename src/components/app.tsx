import Taro, { Events } from "@tarojs/taro";

import * as EventEmitter from "eventemitter3";

export let flutterBase = "https://h5.yidoutang.com/v6";
export const flutterFonts = [
  { name: "MaterialIcons", url: "MaterialIcons-Regular.otf" },
];

const appEvents = new Events();

export class App {
  static instance = new App();

  static callbackChannel: (message: string) => void = () => {};

  start() {
    if (false) {
      this.setupDartChannel();
    } else {
      this.setupJSChannel();
    }
  }

  setupDartChannel() {
    flutterBase = `http://10.0.1.22:9898`;
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
        Router.instance.routes[Router.instance.routes.length - 1]?.update(
          messageData.message
        );
      } else if (messageData.type === "route") {
        Router.receivedRouteMessage(messageData.message);
      }
    });
    App.callbackChannel = (message) => {
      Taro.sendSocketMessage({
        data: message,
      });
    };
  }

  setupJSChannel() {
    (global as any).flutterWindow = {
      addEventListener: (
        eventType: string,
        callback: ({ data: string }) => void
      ) => {
        if (eventType === "message") {
          App.callbackChannel = (message) => {
            callback({ data: message });
          };
        }
        appEvents.on(eventType, (msg) => {
          callback({ data: msg });
        });
      },
      top: {
        postMessage: (message: any) => {
          try {
            const messageData = JSON.parse(message);
            if (messageData.type === "frame_data") {
              Router.instance.routes[Router.instance.routes.length - 1]?.update(
                messageData.message
              );
            } else if (messageData.type === "route") {
              Router.receivedRouteMessage(messageData.message);
            }
          } catch (error) {}
        },
      },
      setTimeout: global.setTimeout,
      location: { href: "" },
      document: {
        body: {
          clientWidth: Taro.getSystemInfoSync().windowWidth,
          clientHeight: Taro.getSystemInfoSync().windowHeight,
        },
      },
      devicePixelRatio: 1.0,
      Taro,
      TaroUtils: {},
      JSON,
      Object,
    };
    require("../dart/main.dart");
  }

  setupFonts() {}

  setupPlugins() {}

  render() {
    return null;
  }
}

export class Route extends EventEmitter {
  data: any;

  update(data: any) {
    this.data = data;
    this.emit("data-changed", data);
  }
}

export class Router {
  static instance = new Router();

  routes: Route[] = [new Route()];

  static triggerPop() {
    if (this.doBacking) return;
    App.callbackChannel(
      JSON.stringify({
        type: "router",
        message: {
          event: "doPop",
        },
      })
    );
  }

  static receivedRouteMessage(message: any) {
    if (message.event === "didPush") {
      this.didPush(message);
    } else if (message.event === "didPop") {
      this.didPop();
    }
  }

  static didPush(message: any) {
    let routeUrl: string = message.route.name;
    if (routeUrl.indexOf("?") > 0) {
      let path = routeUrl.split("?")[0];
      let others = routeUrl
        .split("?")
        .filter((_, idx) => idx > 0)
        .join("?");
      routeUrl = `${path}${encodeURIComponent(`?${others}`)}`;
    }
    this.instance.routes.push(new Route());
    Taro.navigateTo({
      url:
        "index?route=" +
        routeUrl +
        "&routeIndex=" +
        (this.instance.routes.length - 1),
    });
  }

  static doBacking = false;

  static didPop() {
    this.doBacking = true;
    Taro.navigateBack();
    this.instance.routes.pop();
    this.doBacking = false;
  }
}

export default App;
