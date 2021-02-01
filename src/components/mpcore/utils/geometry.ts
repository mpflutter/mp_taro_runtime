import { MPConstraints } from "../component";

function isNumeric(str: any) {
  if (typeof str === "number") return true;
  if (typeof str !== "string") return false; // we only process strings!
  return (
    !isNaN(str as any) && !isNaN(parseFloat(str)) // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  ); // ...and ensure strings of whitespace fail
}

export const cssConstraints = (value?: MPConstraints): any => {
  if (!value) return {};
  return {
    display: "flex",
    minWidth: cssWidth(value.minWidth), // !value.hasTightWidth ? "unset" : cssWidth(value.minWidth),
    maxWidth: cssWidth(value.maxWidth),
    minHeight: cssHeight(value.minHeight), // !value.hasTightHeight ? "unset" : cssHeight(value.minHeight),
    maxHeight: cssHeight(value.maxHeight),
  };
};

export const cssWidth = (value: string, isTight = true) => {
  if (!isNumeric(value)) return "unset";
  if (value === "Infinity" && isTight === false) {
    return "-webkit-fill-available";
  }
  if (value === "Infinity") {
    return "100%";
  } else if (value === "0.001") {
    return "100%";
  } else {
    return value + "px";
  }
};

export const cssHeight = (value: string, isTight = true) => {
  if (!isNumeric(value)) return "unset";
  if (value === "Infinity" && isTight === false) {
    return "-webkit-fill-available";
  }
  if (value === "Infinity") {
    return "100%";
  } else if (value === "0.001") {
    return "100%";
  } else {
    return value + "px";
  }
};

export const cssPadding = (value: string) => {
  if (!value) return {};
  if (value.startsWith("EdgeInsets.zero")) {
    return {};
  } else if (value.startsWith("EdgeInsets.all(")) {
    const trimedValue = value.replace("EdgeInsets.all(", "").replace(")", "");
    return {
      paddingLeft: trimedValue + "px",
      paddingTop: trimedValue + "px",
      paddingRight: trimedValue + "px",
      paddingBottom: trimedValue + "px",
    };
  } else if (value.startsWith("EdgeInsets(")) {
    const trimedValue = value.replace("EdgeInsets(", "").replace(")", "");
    const values = trimedValue.split(",").map((it) => it.trim());
    return {
      paddingLeft: values[0] + "px",
      paddingTop: values[1] + "px",
      paddingRight: values[2] + "px",
      paddingBottom: values[3] + "px",
    };
  } else {
    return {};
  }
};

export const cssBorderRadius = (value: string) => {
  if (value.startsWith("BorderRadius.circular(")) {
    const trimedValue = value
      .replace("BorderRadius.circular(", "")
      .replace(")", "");
    return { borderRadius: trimedValue + "px" };
  } else if (value.startsWith("BorderRadius.all(")) {
    const trimedValue = value.replace("BorderRadius.all(", "").replace(")", "");
    return { borderRadius: trimedValue + "px" };
  } else if (value.startsWith("BorderRadius.only(")) {
    const trimedValue = value
      .replace("BorderRadius.only(", "")
      .replace(/\)/gi, "")
      .replace(/Radius.circular\(/gi, "");
    const topLeft = trimedValue.match(/topLeft: ([0-9|.]+)/)?.[1] ?? 0;
    const topRight = trimedValue.match(/topRight: ([0-9|.]+)/)?.[1] ?? 0;
    const bottomLeft = trimedValue.match(/bottomLeft: ([0-9|.]+)/)?.[1] ?? 0;
    const bottomRight = trimedValue.match(/bottomRight: ([0-9|.]+)/)?.[1] ?? 0;
    return {
      borderTopLeftRadius: `${topLeft}px`,
      borderTopRightRadius: `${topRight}px`,
      borderBottomLeftRadius: `${bottomLeft}px`,
      borderBottomRightRadius: `${bottomRight}px`,
    };
  } else {
    return {};
  }
};

export const cssOffset = (
  value: string
): { dx: string; dy: string } | undefined => {
  if (value.startsWith("Offset(")) {
    const trimedValue = value.replace("Offset(", "").replace(")", "");
    const values = trimedValue.split(",").map((it) => it.trim());
    return { dx: values[0], dy: values[1] };
  } else {
    return undefined;
  }
};
