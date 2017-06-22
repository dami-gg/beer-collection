// @flow
import React, { PureComponent } from "react";

import Dashboard from "../dashboard/Dashboard";
import {PAGE_OPTIONS} from "./statistics.constants";

export class Statistics extends PureComponent {
  render() {
    return (
      <div className="statistics">
        <Dashboard items={PAGE_OPTIONS} />
      </div>
    );
  }
}

export default Statistics;
