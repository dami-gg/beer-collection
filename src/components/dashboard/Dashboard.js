// @flow

import React, { PureComponent } from "react";
import Option from "./option/Option";

import "./dashboard.scss";

class Dashboard extends PureComponent {
  props: {
    items: Array<Object>
  };

  getDashboardItems() {
    return this.props.items && this.props.items.length
      ? this.props.items.map((item, i) => !item.hidden && (
          <Option
            key={i}
            title={item.title}
            url={item.url}
            image={item.image}
          />
        ))
      : "";
  }

  render() {
    return (
      <div className="dashboard">
        {this.getDashboardItems()}
      </div>
    );
  }
}

export default Dashboard;
