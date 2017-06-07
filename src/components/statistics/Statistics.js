import React, { PureComponent } from "react";

import Dashboard from "../dashboard/Dashboard";

import origin from '../../assets/images/origin.png';

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
    image: origin
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
