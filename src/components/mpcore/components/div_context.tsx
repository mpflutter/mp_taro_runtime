import { Component, createContext, createElement } from "react";
import { MPComponentsProps } from "../component";
import React from "react";
import { View } from "@tarojs/components";

export const DivContext = createContext<{ style: any; onClick: any }>({
  style: {},
  onClick: undefined,
});

export class DivContextProvider extends Component<{
  data?: MPComponentsProps;
  style?: any;
  onClick?: any;
}> {
  render() {
    if (!this.props.children || (this.props.children as any[]).length <= 0) {
      return (
        <DivContext.Consumer>
          {(divContext) => (
            <DivContext.Provider
              value={{
                style: {
                  ...divContext.style,
                  ...this.props.style,
                },
                onClick: this.props.onClick ?? divContext.onClick,
              }}
            >
              <DivContextConsumer
                style={{
                  minWidth: "-webkit-fill-available",
                  minHeight: "100%",
                }}
              ></DivContextConsumer>
            </DivContext.Provider>
          )}
        </DivContext.Consumer>
      );
    }
    return (
      <DivContext.Consumer>
        {(divContext) => {
          return (
            <DivContext.Provider
              value={{
                style: {
                  "display": "flex",
                  ...divContext.style,
                  ...this.props.style,
                },
                onClick: this.props.onClick ?? divContext.onClick,
              }}
            >
              {this.props.children}
            </DivContext.Provider>
          );
        }}
      </DivContext.Consumer>
    );
  }
}

export class DivContextConsumer extends Component<any> {
  render() {
    return (
      <DivContext.Consumer>
        {(divContext) => (
          <DivContext.Provider
            value={{
              style: {},
              onClick: undefined,
            }}
          >
            {createElement(
              (this.props.el ?? View) as any,
              {
                onClick: divContext.onClick,
                ...this.props,
                style: (() => {
                  let style = {
                    "display": "flex",
                    ...divContext.style,
                    ...this.props.style,
                  };
                  if (divContext.style.overflow === "hidden") {
                    style.overflow = "hidden";
                  }
                  return style;
                })(),
              },
              this.props.children
            )}
          </DivContext.Provider>
        )}
      </DivContext.Consumer>
    );
  }
}
