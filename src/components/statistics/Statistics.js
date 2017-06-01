import React, { PureComponent } from "react";

import Dashboard from "../dashboard/Dashboard";

const PAGE_OPTIONS: Array<Object> = [
  {
    title: "Rating",
    url: "/ratings",
    image: "https://unsplash.it/150/150", // TODO
    hidden: true
  },
  {
    title: "Origin",
    url: "/origin",
    image: "https://unsplash.it/150/150" // TODO
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
