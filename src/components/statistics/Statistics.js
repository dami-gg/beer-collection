import React, { PureComponent } from "react";

import Dashboard from "../dashboard/Dashboard";

const PAGE_OPTIONS: Array<Object> = [
  {
    title: "Rating",
    url: "/ratings",
    image: ""
  },
  {
    title: "Origin",
    url: "/origin",
    image: ""
  }
];

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
