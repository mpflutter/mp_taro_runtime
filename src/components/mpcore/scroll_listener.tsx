import { App } from "../app";

export class ScrollListener {
  static instance = new ScrollListener();

  _scrollListener: any;
  _scrollToBottomLastCall: any;

  onReachBottom() {
    if (this._scrollToBottomLastCall > new Date().getTime()) {
      return;
    }
    this._scrollToBottomLastCall = new Date().getTime() + 2000;
    App.callbackChannel(
      JSON.stringify({
        type: "scroller",
        message: {
          event: "onScrollToBottom",
        },
      })
    );
  }
}
