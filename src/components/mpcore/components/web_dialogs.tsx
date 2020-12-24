import App from "../../app";

export class WebDialogs {
  static receivedWebDialogsMessage(message: any) {
    if (message["params"]["dialogType"] === "alert") {
      window.alert(message["params"]["message"]);
      App.callbackChannel(
        JSON.stringify({
          type: "action",
          message: { event: "callback", id: message["id"] },
        })
      );
    } else if (message["params"]["dialogType"] === "confirm") {
      const result = window.confirm(message["params"]["message"]);
      App.callbackChannel(
        JSON.stringify({
          type: "action",
          message: { event: "callback", id: message["id"], data: result },
        })
      );
    } else if (message["params"]["dialogType"] === "prompt") {
      const result = window.prompt(
        message["params"]["message"],
        message["params"]["defaultValue"]
      );
      App.callbackChannel(
        JSON.stringify({
          type: "action",
          message: { event: "callback", id: message["id"], data: result },
        })
      );
    }
  }
}
