// @flow
import React, { PureComponent } from "react";

import Dashboard from "../dashboard/Dashboard";
import { PAGE_OPTIONS } from "./statistics.constants";

type Props = {};

export class Statistics extends PureComponent<void, Props, void> {
  render() {
    return (
      <div className="statistics">
        <Dashboard items={PAGE_OPTIONS} />
      </div>
    );
  }
}

export default Statistics;
