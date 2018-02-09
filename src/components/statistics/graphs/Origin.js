// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import { VictoryContainer, VictoryPie } from "victory";

import { COLORS } from "./graphs.constants";
import { getOriginData } from "./graphs.helpers";

import "./graphs.scss";

type Props = {
  collection: Array<Beer>
};

class Origin extends Component<Props> {
  render() {
    const data = getOriginData(this.props.collection);

    return (
      <div className="graph graph--origin">
        <h1>Number of beers by origin</h1>
        <div className="graph-wrapper">
          <VictoryPie
            data={data}
            innerRadius={100}
            labelRadius={110}
            labels={entry =>
              entry.count > 3 * this.props.collection.length / 100
                ? entry.origin
                : ""}
            x="origin"
            y="count"
            colorScale={COLORS}
            containerComponent={<VictoryContainer responsive={true} />}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Origin);
