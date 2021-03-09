import Taro, { Events } from "@tarojs/taro";
import AppConfig from "../app.config";

export let flutterBase = "http://127.0.0.1:9898";

const appEvents = new Events();

export class App {
  static instance = new App();
  static started = false;

  static callbackChannel: (message: string) => void = () => {};

  mpFlutterIsDebug() {
    return AppConfig.mp.isDebug;
  }

  async start() {
    if (App.started) return;
    App.started = true;
    if (this.mpFlutterIsDebug()) {
      this.setupDartChannel();
    } else {
      this.setupJSChannel();
    }
    return new Promise((res) => {
      setTimeout(() => {
        res(null);
      }, 100);
    });
  }

  setupDartChannel() {
    flutterBase = `http://${AppConfig.mp.debugServer}:9898`;
    Taro.connectSocket({
      url: `ws://${AppConfig.mp.debugServer}:9898/`,
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
        Router.instance.routes[messageData.message.routeId]?.update(
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
      ...global,
      setTimeout: function (fn, ms) {
        return global.setTimeout(fn, ms);
      },
      clearTimeout: function (handle) {
        return global.clearTimeout(handle);
      },
      Taro,
      Object,
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
              Router.instance.routes[messageData.message.routeId]?.update(
                messageData.message
              );
            } else if (messageData.type === "route") {
              Router.receivedRouteMessage(messageData.message);
            }
          } catch (error) {}
        },
      },
      location: { href: Taro.getCurrentInstance().page?.path },
      document: {
        body: {
          clientWidth: Taro.getSystemInfoSync().windowWidth,
          clientHeight: Taro.getSystemInfoSync().windowHeight,
        },
      },
      devicePixelRatio: 1.0,
      locationToSubPackage: (pkgName, routeName) => {
        Taro.navigateTo({ url: `/pages/${pkgName}/index?route=${routeName}` });
      },
    };
    require("../dart/main.dart");
  }

  setupFonts() {}

  setupPlugins() {}

  render() {
    return null;
  }
}

export class Route extends Events {
  data: any;

  update(data: any) {
    this.data = data;
    this.trigger("data-changed", data);
  }
}

export class Router {
  static instance = new Router();

  routes: { [key: string]: Route } = { "0": new Route() };

  static triggerPop(toRouteId: string) {
    if (this.doBacking) return;
    App.callbackChannel(
      JSON.stringify({
        type: "router",
        message: {
          event: "doPop",
          toRouteId: toRouteId,
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

  static lastPushingRouteId: string | undefined;
  static lastPageReplacing: boolean | undefined;

  static didPush(message: any) {
    let routeId: string = message.route.hash?.toString() ?? "0";
    let routeUrl: string = message.route.name;
    if (routeUrl.indexOf("?") > 0) {
      let path = routeUrl.split("?")[0];
      let others = routeUrl
        .split("?")
        .filter((_, idx) => idx > 0)
        .join("?");
      routeUrl = `${path}${encodeURIComponent(`?${others}`)}`;
    }
    Router.instance.routes[routeId] = new Route();
    Router.lastPushingRouteId = routeId;
    if (Router.lastPageReplacing) {
      Taro.redirectTo({
        url: "index?route=" + routeUrl,
      });
      Router.lastPageReplacing = false;
    } else {
      Taro.navigateTo({
        url: "index?route=" + routeUrl,
      });
    }
  }

  static doBacking = false;

  static didPop() {
    this.doBacking = true;
    Taro.navigateBack();
    this.doBacking = false;
  }
}

export default App;
