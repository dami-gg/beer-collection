// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  ResponsiveContainer
} from "recharts";

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
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="origin" stroke="white" />
            <YAxis stroke="white" />
            <Bar dataKey="count" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Origin);
