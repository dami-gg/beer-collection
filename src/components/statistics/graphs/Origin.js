// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

import { COLORS } from "./graphs.constants";
import {getOriginData} from './graphs.helpers';

import "./graphs.scss";

class Origin extends Component {
  props: {
    collection: Array<Beer>
  };

  render() {
    const data = getOriginData(this.props.collection);
    
    return (
      <div className="statistic">
        <h1>Number of beers by origin</h1>
        <BarChart
          className="graph graph--origin"
          width={600}
          height={300}
          data={data}
        >
          <XAxis dataKey="origin" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Origin);
