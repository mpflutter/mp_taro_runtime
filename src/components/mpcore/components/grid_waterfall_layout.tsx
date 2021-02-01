import { cssPadding } from "../utils/geometry";
import { DivContextProvider } from "./div_context";
import React from "react";
import { View } from "@tarojs/components";

export interface SliverGridDelegateWithFixedCrossAxisCount {
  mainAxisSpacing: number;
  crossAxisSpacing: number;
  crossAxisCount: number;
  childAspectRatio: number;
}

export const renderSliverGridDelegateWithFixedCrossAxisCount = (
  delegate: SliverGridDelegateWithFixedCrossAxisCount,
  padding: string | undefined,
  children: any[],
  options?: { parentWidth: number | undefined } | undefined
): any[] => {
  const clientWidth = options?.parentWidth ?? document.body.clientWidth;

  const gridViewPadding = padding ? cssPadding(padding) : {};
  const paddingTop = gridViewPadding.paddingTop
    ? parseInt(gridViewPadding.paddingTop)
    : 0;
  const paddingLeft = gridViewPadding.paddingLeft
    ? parseInt(gridViewPadding.paddingLeft)
    : 0;
  const paddingRight = gridViewPadding.paddingRight
    ? parseInt(gridViewPadding.paddingRight)
    : 0;
  const paddingBottom = gridViewPadding.paddingBottom
    ? parseInt(gridViewPadding.paddingBottom)
    : 0;

  return children.map((it, idx) => {
    const itemWidth =
      (clientWidth -
        paddingLeft -
        paddingRight -
        delegate.crossAxisSpacing * (delegate.crossAxisCount - 1)) /
      delegate.crossAxisCount;
    const marginLeft =
      idx % delegate.crossAxisCount === 0 ? `${paddingLeft}px` : "unset";
    const marginRight =
      (idx + 1) % delegate.crossAxisCount === 0
        ? "unset"
        : `${delegate.crossAxisSpacing}px`;
    let marginTop =
      idx / delegate.crossAxisCount >= 1
        ? `${delegate.mainAxisSpacing}px`
        : "unset";
    let marginBottom = "unset";
    if (idx < delegate.crossAxisCount && paddingTop > 0) {
      marginTop = paddingTop + "px";
    }
    if (idx === children.length - 1 && paddingBottom > 0) {
      marginBottom = paddingBottom + "px";
    }
    return (
      <View
        key={`layout_${idx}`}
        style={{
          width: itemWidth + "px",
          height: itemWidth / delegate.childAspectRatio + "px",
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
        }}
      >
        <DivContextProvider
          style={{ display: "flex", minWidth: "100%", minHeight: "100%" }}
        >
          {it}
        </DivContextProvider>
      </View>
    );
  });
};

export interface SliverGridDelegateWithMaxCrossAxisExtent {
  mainAxisSpacing: number;
  crossAxisSpacing: number;
  maxCrossAxisExtent: number;
  childAspectRatio: number;
}

export const renderSliverGridDelegateWithMaxCrossAxisExtent = (
  delegate: SliverGridDelegateWithMaxCrossAxisExtent,
  padding: string | undefined,
  children: any[],
  options?: { parentWidth: number | undefined } | undefined
): any[] => {
  const clientWidth = options?.parentWidth ?? document.body.clientWidth;

  const gridViewPadding = padding ? cssPadding(padding) : {};
  const paddingTop = gridViewPadding.paddingTop
    ? parseInt(gridViewPadding.paddingTop)
    : 0;
  const paddingLeft = gridViewPadding.paddingLeft
    ? parseInt(gridViewPadding.paddingLeft)
    : 0;
  const paddingRight = gridViewPadding.paddingRight
    ? parseInt(gridViewPadding.paddingRight)
    : 0;
  const paddingBottom = gridViewPadding.paddingBottom
    ? parseInt(gridViewPadding.paddingBottom)
    : 0;

  const crossAxisCount = Math.ceil(
    (clientWidth - paddingLeft - paddingRight) / delegate.maxCrossAxisExtent
  );

  return children.map((it, idx) => {
    const itemWidth =
      (clientWidth -
        paddingLeft -
        paddingRight -
        delegate.crossAxisSpacing * (crossAxisCount - 1)) /
      crossAxisCount;
    const marginLeft =
      idx % crossAxisCount === 0 ? `${paddingLeft}px` : "unset";
    const marginRight =
      (idx + 1) % crossAxisCount === 0
        ? "unset"
        : `${delegate.crossAxisSpacing}px`;
    let marginTop =
      idx / crossAxisCount >= 1 ? `${delegate.mainAxisSpacing}px` : "unset";
    let marginBottom = "unset";
    if (idx < crossAxisCount && paddingTop > 0) {
      marginTop = paddingTop + "px";
    }
    if (idx === children.length - 1 && paddingBottom > 0) {
      marginBottom = paddingBottom + "px";
    }
    return (
      <View
        key={`layout_${idx}`}
        style={{
          width: itemWidth + "px",
          height: itemWidth / delegate.childAspectRatio + "px",
          marginLeft,
          marginRight,
          marginTop,
          marginBottom,
        }}
      >
        <DivContextProvider
          style={{ display: "flex", minWidth: "100%", minHeight: "100%" }}
        >
          {it}
        </DivContextProvider>
      </View>
    );
  });
};

export interface SliverWaterfallDelegate {
  mainAxisSpacing: number;
  crossAxisSpacing: number;
  crossAxisCount: number;
}

export const renderSliverWaterfallDelegate = (
  delegate: SliverWaterfallDelegate,
  padding: string | undefined,
  children: any[],
  options?: { parentWidth: number | undefined } | undefined
): any => {
  const clientWidth = options?.parentWidth ?? document.body.clientWidth;
  const gridViewPadding = padding ? cssPadding(padding) : {};
  const paddingLeft = gridViewPadding.paddingLeft
    ? parseInt(gridViewPadding.paddingLeft)
    : 0;
  const paddingRight = gridViewPadding.paddingRight
    ? parseInt(gridViewPadding.paddingRight)
    : 0;
  const paddingBottom = gridViewPadding.paddingBottom
    ? parseInt(gridViewPadding.paddingBottom)
    : 0;

  const itemWidth =
    (clientWidth -
      paddingLeft -
      paddingRight -
      delegate.crossAxisSpacing * (delegate.crossAxisCount - 1)) /
    delegate.crossAxisCount;
  let currentRowIndex = 0;
  let layoutCache: any[] = [];
  let maxY = 0.0;

  const layouts = children.map((it, idx) => {
    const itemHeight = it.props?.data?.attributes?.height ?? 0.0;
    let currentY: number;

    for (
      let index = currentRowIndex;
      index < delegate.crossAxisCount;
      index++
    ) {
      const nextIndex = index + 1 >= delegate.crossAxisCount ? 0 : index + 1;
      if (layoutCache[index] && layoutCache[nextIndex]) {
        if (
          layoutCache[nextIndex].y + layoutCache[nextIndex].height <
          layoutCache[index].y + layoutCache[index].height
        ) {
          currentRowIndex = nextIndex;
          break;
        } else {
          currentRowIndex = index;
          break;
        }
      } else {
        currentRowIndex = index;
        break;
      }
    }

    if (layoutCache[currentRowIndex]) {
      currentY =
        layoutCache[currentRowIndex].y + layoutCache[currentRowIndex].height;
      if (idx >= delegate.crossAxisCount) {
        currentY += delegate.mainAxisSpacing;
      }
    } else {
      currentY = gridViewPadding?.paddingTop
        ? parseInt(gridViewPadding.paddingTop)
        : 0.0;
    }
    const size = {
      x:
        paddingLeft +
        itemWidth * currentRowIndex +
        currentRowIndex * delegate.crossAxisSpacing,
      y: currentY,
      width: itemWidth,
      height: itemHeight,
    };
    layoutCache[currentRowIndex] = size;
    currentRowIndex = (currentRowIndex + 1) % delegate.crossAxisCount;
    maxY = Math.max(currentY + itemHeight, maxY);
    return size;
  });

  return (
    <View style={{ position: "relative", width: "100%", height: maxY + "px" }}>
      {children.map((it, idx) => {
        return (
          <View
            key={`layout_${idx}`}
            style={{
              position: "absolute",
              left: layouts[idx].x + "px",
              top: layouts[idx].y + "px",
              width: layouts[idx].width + "px",
              height: layouts[idx].height + paddingBottom + "px",
            }}
          >
            <DivContextProvider
              style={{ display: "flex", minWidth: "100%", minHeight: "100%" }}
            >
              {it}
            </DivContextProvider>
          </View>
        );
      })}
    </View>
  );
};
