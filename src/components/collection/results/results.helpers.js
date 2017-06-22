// @flow
import { getLabelStyle } from "../../../helpers/style.helpers";

export const getBeerTypeLabelStyle = (
  type?: string,
  allBeerTypes: Array<string>
) => {
  const typeIndex: number = allBeerTypes.findIndex(
    (currentType: string) => currentType === type
  );
  return getLabelStyle(typeIndex, allBeerTypes.length);
};
