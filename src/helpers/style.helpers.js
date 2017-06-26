// @flow
export const getLabelStyle = (index: number, total: number) => {
  let style = {};
  style.color = "black";
  style.backgroundColor = "hsl(" + (index/total) * 360 + ", 70%, 80%)";
  return style;
};
