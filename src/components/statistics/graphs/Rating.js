// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { PieChart, Pie, Cell } from "recharts";

import "./graphs.scss";

import { COLORS } from "./graphs.constants";
import { getRatingData } from "./graphs.helpers";

class Rating extends Component {
  props: {
    collection: Array<Beer>
  };

  render() {
    const data = getRatingData(this.props.collection);

    return (
      <div className="statistic">
        <h1>Beers per rating</h1>
        <PieChart className="graph graph--rating" width={800} height={400}>
          <Pie
            data={data}
            cx={120}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Rating);
