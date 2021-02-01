import { Component } from "react";
import "./app.scss";
import { App as FlutterApp } from "./components/app";

class App extends Component {
  componentDidMount() {
    FlutterApp.instance.start();
  }

  render() {
    return this.props.children;
  }
}

export default App;
