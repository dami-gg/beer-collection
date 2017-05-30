// @flow
import type { Beer } from "../../../types/beer.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import "./graphs.scss";

import { COLORS } from "./graphs.constants";
import { getRatingData } from "./graphs.helpers";

class Rating extends Component {
  data: Array<Object>;

  props: {
    collection: Array<Beer>
  };

  componentWillMount() {
    this.data = getRatingData(this.props.collection);
    console.log(this.data);
  }

  render() {
    return (
      <div className="graph graph--rating">
        <h1>Beers per rating</h1>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={this.data}
              cx={120}
              cy={200}
              innerRadius={60}
              outerRadius={80}
              fill="#8884d8"
              paddingAngle={5}
            >
              {this.data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  collection: state.collection
});

export default connect(mapStateToProps)(Rating);
