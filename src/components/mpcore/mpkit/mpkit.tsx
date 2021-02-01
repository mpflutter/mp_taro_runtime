import { ComponentType } from "react";
import { MPWebView } from "./web_view";
import { MPScaffold } from "./scaffold";

export class MPKit {
  static components: { [key: string]: ComponentType<any> } = {
    mp_web_view: MPWebView,
    mp_scaffold: MPScaffold,
  };
}
