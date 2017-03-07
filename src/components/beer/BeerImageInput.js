import React, {Component} from 'react';

class BeerImageInput extends Component {
  props:{
    handleImageSelection: Function,
    thumbnail: string
  };

  render() {
    return (
        <div>
          <input type="file" onChange={this.props.handleImageSelection}/>
          <br/>
          <img width="320" src={this.props.thumbnail} alt=""></img>
        </div>
    )
  }
}

export default BeerImageInput;
