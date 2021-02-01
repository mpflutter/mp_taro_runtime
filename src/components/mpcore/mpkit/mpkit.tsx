import { ComponentType } from "react";
import { MPWebView } from "./web_view";
import { MPScaffold } from "./scaffold";
import { MPPageView } from "./page_view";
import { MPVideoView } from "./video_view";

export class MPKit {
  static components: { [key: string]: ComponentType<any> } = {
    mp_web_view: MPWebView,
    mp_scaffold: MPScaffold,
    mp_page_view: MPPageView,
    mp_video_view: MPVideoView,
  };
}
