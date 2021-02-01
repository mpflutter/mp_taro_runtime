import { Component } from "react";
import React from "react";
import { View } from "@tarojs/components";

export class SliverList extends Component {
    render() {
        return <View>{this.props.children}</View>;
    }
}
