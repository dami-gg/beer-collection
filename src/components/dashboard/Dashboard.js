// @flow
import React, { PureComponent } from "react";
import Option from "./option/Option";

import "./dashboard.scss";

type Props = {
  items: Array<Object>
};

class Dashboard extends PureComponent<Props> {
  getDashboardItems() {
    return this.props.items && this.props.items.length
      ? this.props.items.map(
          (item, i) =>
            !item.hidden && (
              <Option
                key={i}
                title={item.title}
                url={item.url}
                image={item.image}
                disabled={item.disabled}
              />
            )
        )
      : "";
  }

  render() {
    return <div className="dashboard">{this.getDashboardItems()}</div>;
  }
}

export default Dashboard;
