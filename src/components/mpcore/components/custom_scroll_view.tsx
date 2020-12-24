import { Component } from "react";
import React from "react";
import { App } from "../../app";

export class CustomScrollView extends Component {
  _scrollListener: any;
  _scrollToBottomLastCall: any;

  componentDidMount() {
    if (window) {
      this._scrollListener = () => {
        if (
          window.pageYOffset + window.innerHeight >=
          window.document.body.scrollHeight
        ) {
          if (this._scrollToBottomLastCall > new Date().getTime()) {
            return;
          }
          this._scrollToBottomLastCall = new Date().getTime() + 5000;
          App.callbackChannel(
            JSON.stringify({
              type: "scroller",
              message: {
                event: "onScrollToBottom"
              }
            })
          );
        }
      };
      window.document.addEventListener("scroll", this._scrollListener);
    }
  }

  componentWillUnmount() {
    window.document.removeEventListener("scroll", this._scrollListener);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "stretch",
          minWidth: "100%"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}
