import { ComponentType } from "react";

export interface MPPlugin {
  components: { [key: string]: ComponentType<any> };
  onMessage(message: { type: string; message: any }): void;
}
