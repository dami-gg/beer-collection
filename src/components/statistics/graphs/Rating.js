// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import { VictoryContainer, VictoryChart, VictoryBar } from "victory";

import { getRatingData } from "./graphs.helpers";

import "./graphs.scss";

type Props = {
  collection: Array<Beer>
};

class Rating extends Component<Props> {
  data: Array<Object>;

  componentWillMount() {
    this.data = getRatingData(this.props.collection);
  }

  render() {
    const data = getRatingData(this.props.collection);

    return (
      <div className="graph graph--rating">
        <h1>Beers per rating</h1>
        <div className="graph-wrapper">
          <VictoryChart domainPadding={{ x: 15 }}>
            <VictoryBar
              data={data}
              barRatio={0.6}
              x="rating"
              y="count"
              style={{ data: { fill: "#b85b3f" } }}
              containerComponent={<VictoryContainer responsive={true} />}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            />
          </VictoryChart>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Rating);
