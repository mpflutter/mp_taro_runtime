import { cssColor } from "./color";

export const cssBorder = (value: any) => {
    let output: any = {};
    if (value[`topStyle`] !== "BorderStyle.none") {
        output.borderTopWidth =
            value.topWidth === 0.0
                ? `${(1.0 / window.devicePixelRatio).toFixed(2)}px`
                : value.topWidth + "px";
        output.borderTopColor = cssColor(value.topColor);
        output.borderTopStyle = "solid";
    }
    if (value[`leftStyle`] !== "BorderStyle.none") {
        output.borderLeftWidth =
            value.leftWidth === 0.0
                ? `${(1.0 / window.devicePixelRatio).toFixed(2)}px`
                : value.leftWidth + "px";
        output.borderLeftColor = cssColor(value.leftColor);
        output.borderLeftStyle = "solid";
    }
    if (value[`bottomStyle`] !== "BorderStyle.none") {
        output.borderBottomWidth =
            value.bottomWidth === 0.0
                ? `${(1.0 / window.devicePixelRatio).toFixed(2)}px`
                : value.bottomWidth + "px";
        output.borderBottomColor = cssColor(value.bottomColor);
        output.borderBottomStyle = "solid";
    }
    if (value[`rightStyle`] !== "BorderStyle.none") {
        output.borderRightWidth =
            value.rightWidth === 0.0
                ? `${(1.0 / window.devicePixelRatio).toFixed(2)}px`
                : value.rightWidth + "px";
        output.borderRightColor = cssColor(value.rightColor);
        output.borderRightStyle = "solid";
    }
    return output;
};
