import React from "react";
import App from "./app";

export const AppContext = React.createContext<typeof App | undefined>(
  undefined
);
