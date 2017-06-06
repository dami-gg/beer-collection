import React, {PureComponent} from 'react';

import './search-box.scss';

class SearchBox extends PureComponent {
  props: {
    className: string,
    changeHandler: Function
  };

  render() {
    return (
        <div className={`search-box ${this.props.className}`}>
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
