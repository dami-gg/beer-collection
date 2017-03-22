import React, {Component} from 'react';

import './beer-image.scss';

class BeerImageInput extends Component {
  props:{
    handleImageSelection: Function,
    thumbnail: string,
    readOnly: boolean,
    currentImage: string
  };

  render() {
    return (
        <div className="beer-image">
          <div className="beer-image__frame">
            {
              (this.props.thumbnail || this.props.currentImage) &&
              <img className="img-responsive"
                   src={this.props.thumbnail || this.props.currentImage}
                   alt=""></img>
            }
          </div>
          {
            !this.props.readOnly &&
            <div className="beer-image__buttons">
              <input className="beer-image__buttons--add"
                     type="file"
                     onChange={this.props.handleImageSelection}/>
            </div>
          }
        </div>
    )
  }
}

export default BeerImageInput;
