export const cssColor = (value: string) => {
  const intValue = parseInt(value);

  return `rgba(${(intValue >> 16) & 0xff}, ${(intValue >> 8) & 0xff}, ${
    (intValue >> 0) & 0xff
  }, ${((intValue >> 24) & 0xff) / 255.0})`;
};

export const cssGradient = (value: any) => {
  if (!value) return "";
  if (value.classname === "LinearGradient") {
    let end = (() => {
      switch (value.end) {
        case "centerRight":
          return "to right";
        case "centerLeft":
          return "to left";
        case "topRight":
          return "to top right";
        case "bottomRight":
          return "to bottom right";
        case "topLeft":
          return "to top left";
        case "bottomLeft":
          return "to bottom left";
        case "topCenter":
          return "to top";
        case "bottomCenter":
          return "to bottom";
        default:
          break;
      }
    })();
    let segments: string[] = [];
    if (value.stops && value.stops.length) {
      segments = value.colors.map((it: string, idx: number) => {
        if (value.stops[idx] !== undefined) {
          return `${cssColor(it)} ${(value.stops[idx] * 100).toFixed(0)}%`;
        } else {
          return cssColor(it);
        }
      });
    } else {
      segments = value.colors.map((it: string) => cssColor(it));
    }
    return `linear-gradient(${end}, ${segments.join(", ")})`;
  }
  return ``;
};
