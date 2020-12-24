import * as EventEmitter from "eventemitter3";

export class Router extends EventEmitter {
  static instance = new Router();

  routes: Route[] = [];

  startApp(route: Route) {
    this.routes.push(route);
  }
}

export class Route extends EventEmitter {
  data: any;

  update(data: any) {
    this.data = data;
    this.emit("data-changed", data);
  }
}
