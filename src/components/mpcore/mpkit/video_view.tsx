import { Component } from "react";
import { MPComponentsProps } from "../component";
import { cssConstraints } from "../utils/geometry";

export class MPVideoView extends Component<{ data: MPComponentsProps }> {
  render() {
    return null;
    // return (
    //   <video
    //     src={this.props.data.attributes.url}
    //     controls={true}
    //     style={{
    //       ...cssConstraints(this.props.data.constraints),
    //     }}
    //   ></video>
    // );
  }
}
