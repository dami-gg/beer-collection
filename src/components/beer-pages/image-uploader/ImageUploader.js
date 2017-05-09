import React, {Component} from 'react';

import './image-uploader.scss';

class ImageUploader extends Component {
  props: {
    handleImageSelection: Function,
    thumbnail: string,
    readOnly: boolean,
    currentImage: string
  };

  render() {
    return (
        <div className="beer-image">
          <div className={(this.props.thumbnail || this.props.currentImage) ? 'beer-image__frame' : 'beer-image__frame-empty'}>
            {
              (this.props.thumbnail || this.props.currentImage) &&
              <img src={this.props.thumbnail || this.props.currentImage} alt=""></img>
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
    );
  }
}

export default ImageUploader;
