// @flow
import React, { PureComponent } from "react";

import Option from "./option/Option";

import ErrorBoundary from "../common/error-boundary/ErrorBoundary";

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
              <ErrorBoundary key={i}>
                <Option
                  title={item.title}
                  url={item.url}
                  image={item.image}
                  disabled={item.disabled}
                />
              </ErrorBoundary>
            )
        )
      : "";
  }

  render() {
    return <div className="dashboard">{this.getDashboardItems()}</div>;
  }
}

export default Dashboard;
