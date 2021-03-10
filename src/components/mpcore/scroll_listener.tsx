export class ScrollListener {
  static instance = new ScrollListener();

  _scrollListener: any;
  _scrollToBottomLastCall: any;
  _App: any;

  setApp(app) {
    this._App = app;
  }

  onReachBottom() {
    if (this._scrollToBottomLastCall > new Date().getTime()) {
      return;
    }
    this._scrollToBottomLastCall = new Date().getTime() + 2000;
    this._App?.callbackChannel(
      JSON.stringify({
        type: "scroller",
        message: {
          event: "onScrollToBottom",
        },
      })
    );
  }
}
