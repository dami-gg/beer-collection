import React, { PureComponent } from "react";

import Dashboard from "../dashboard/Dashboard";

import crate from "../../assets/images/crate.png";
import tap from "../../assets/images/tap.png";
import statistics from "../../assets/images/statistics.png";
import globe from "../../assets/images/globe.png";
import caps from "../../assets/images/caps.png";

const PAGE_OPTIONS: Array<Object> = [
  {
    title: "Add a new beer",
    url: "/beer/add",
    image: tap 
  },
  {
    title: "See your collection",
    url: "/collection",
    image: crate
  },
  {
    title: "Manage collection",
    url: "/collection/manage",
    image: caps
  },
  {
    title: "See statistics",
    url: "/statistics",
    image: statistics 
  },
  {
    title: "Beer map",
    url: "/map",
    image: globe 
  }
];

class Home extends PureComponent {
  render() {
    return (
      <div className="home">
        <Dashboard items={PAGE_OPTIONS} />
      </div>
    );
  }
}

export default Home;
