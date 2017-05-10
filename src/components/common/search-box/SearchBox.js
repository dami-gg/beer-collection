import React, {Component} from 'react';

import './search-box.scss';

class SearchBox extends Component {
  props: {
    changeHandler: Function
  };

  render() {
    return (
        <div className="search-box">
          <input className="search-box__input"
                 type="text"
                 placeholder="Search by name"
                 onChange={this.props.changeHandler}>
          </input>
          <i className="search-box__icon fa fa-search"></i>
        </div>
    );
  }
}

export default SearchBox;
