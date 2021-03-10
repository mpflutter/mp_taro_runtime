import { Component } from "react";
import { cssTextAlign, cssTextStyle } from "../utils/text";
import { AppContext } from "../../app_provider";
import { MPComponentsProps } from "../component";
import React from "react";
import { cssConstraints } from "../utils/geometry";
import { View } from "@tarojs/components";

export class EditableText extends Component<{ data: MPComponentsProps }> {
  _lastValue: any;

  _onSubmitted(App: any, target: HTMLInputElement, value: string) {
    if (this.props.data.attributes.onSubmitted) {
      App?.callbackChannel(
        JSON.stringify({
          type: "editable_text",
          message: {
            event: "onSubmitted",
            target: this.props.data.attributes.onSubmitted,
            data: value,
          },
        })
      );
      target.blur();
    }
  }

  _onChanged(App: any, _: HTMLInputElement, value: string) {
    App?.callbackChannel(
      JSON.stringify({
        type: "editable_text",
        message: {
          event: "onChanged",
          target: this.props.data.attributes.onChanged,
          data: value,
        },
      })
    );
  }

  _keyboardType(value: string) {
    if (value?.indexOf("TextInputType.number") > 0) {
      return "number";
    }
    return "text";
  }

  _keyboardPattern(value: string) {
    if (value?.indexOf("TextInputType.number") > 0) {
      const signed = value.indexOf("signed: true") > 0;
      const decimal = value.indexOf("decimal: true") > 0;
      if (signed && decimal) {
        return "[0-9+-.]*";
      }
      if (signed && !decimal) {
        return "[0-9+-]*";
      }
      if (!signed && !decimal) {
        return "[0-9]*";
      }
    }
    return "";
  }

  render() {
    if (this.props.data.attributes.maxLines > 1) {
      return (
        <AppContext.Consumer>
          {(App) => (
            <View style={{ ...cssConstraints(this.props.data.constraints) }}>
              <textarea
                style={{
                  ...cssTextStyle(this.props.data.attributes.style),
                  textAlign: cssTextAlign(this.props.data.attributes.textAlign),
                  width: "100%",
                  height: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onInput={(event) => {
                  this._lastValue = (event.target as HTMLInputElement).value;
                  this._onChanged(
                    App,
                    event.target as HTMLInputElement,
                    (event.target as HTMLInputElement).value
                  );
                }}
                onChange={(event) => {
                  this._lastValue = ((event.target as unknown) as HTMLInputElement).value;
                  this._onChanged(
                    App,
                    (event.target as unknown) as HTMLInputElement,
                    ((event.target as unknown) as HTMLInputElement).value
                  );
                }}
                rows={this.props.data.attributes.maxLines}
                readOnly={this.props.data.attributes.readOnly}
              >
                {this.props.data.attributes.value || this._lastValue}
              </textarea>
            </View>
          )}
        </AppContext.Consumer>
      );
    }
    return (
      <AppContext.Consumer>
        {(App) => (
          <View style={{ ...cssConstraints(this.props.data.constraints) }}>
            <input
              style={{
                ...cssTextStyle(this.props.data.attributes.style),
                textAlign: cssTextAlign(this.props.data.attributes.textAlign),
                width: "100%",
                height: "100%",
                backgroundColor: "transparent",
                border: "none",
              }}
              onKeyUp={(event) => {
                if (event.key === "Enter" || event.keyCode === 13) {
                  this._onSubmitted(
                    App,
                    event.target as HTMLInputElement,
                    (event.target as HTMLInputElement).value
                  );
                }
              }}
              onInput={(event) => {
                this._lastValue = (event.target as HTMLInputElement).value;
                this._onChanged(
                  App,
                  event.target as HTMLInputElement,
                  (event.target as HTMLInputElement).value
                );
              }}
              onChange={(event) => {
                this._lastValue = (event.target as HTMLInputElement).value;
                this._onChanged(
                  App,
                  event.target as HTMLInputElement,
                  (event.target as HTMLInputElement).value
                );
              }}
              readOnly={this.props.data.attributes.readOnly}
              type={
                this.props.data.attributes.obscureText
                  ? "password"
                  : this._keyboardType(this.props.data.attributes.keyboardType)
              }
              pattern={this._keyboardPattern(
                this.props.data.attributes.keyboardType
              )}
              value={this.props.data.attributes.value || this._lastValue}
              autoFocus={this.props.data.attributes.autofocus}
              autoCorrect={this.props.data.attributes.autoCorrect}
            ></input>
          </View>
        )}
      </AppContext.Consumer>
    );
  }
}
