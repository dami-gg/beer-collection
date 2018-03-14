// @flow

import type { Image } from "../../../types/image.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../modal/Modal";
import Gallery from "../../gallery/Gallery";
import ImageUploader from "../image-uploader/ImageUploader";
import FloatingButton from "../floating-button/FloatingButton";

import { uploadImage } from "../image-uploader/image-uploader.helpers";
import { addImageToState } from "../../../actions/gallery.actions";
import {
  showSuccessNotification,
  showErrorNotification
} from "../../../helpers/notifications.helpers";

type Props = {
  isOpened: boolean,
  selectedImage?: Image,
  onClose: Function,
  onSelection?: Function,
  addImageToState: Function
};

type State = {
  selectedImage: Image | null
};

export class GalleryModal extends Component<Props, State> {
  state: State;
  handleSelection: Function;
  saveSelection: Function;
  handleImageUpload: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedImage: null,
      uploadedImage: null
    };

    this.handleSelection = this.handleSelection.bind(this);
    this.saveSelection = this.saveSelection.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
  }

  handleSelection(selectedImage: Image) {
    this.setState({ selectedImage });
  }

  saveSelection() {
    this.props.onSelection && this.props.onSelection(this.state.selectedImage);
  }

  handleImageUpload(uploadedImage: Object) {
    uploadImage(uploadedImage)
      .then(imageUrl => {
        this.props.addImageToState({ url: imageUrl });
        showSuccessNotification("The image has been successfully uploaded");
      })
      .catch(error => {
        console.log(error); // TODO Handle error
        showErrorNotification("The image could not be uploaded");
      });
  }

  render() {
    return (
      <Modal
        className="gallery-modal"
        isOpened={this.props.isOpened}
        onClose={this.props.onClose}
        onSave={this.saveSelection}>
        <Gallery
          onSelect={this.handleSelection}
          selectedImage={this.state.selectedImage}
        />

        <ImageUploader
          selector="gallery-modal"
          onImageUploaded={this.handleImageUpload}
          wrapper={FloatingButton}
          wrapperProps={{
            iconClass: "fa fa-file-image",
            label: "Upload an image",
            buttonColor: "green",
            iconColor: "white"
          }}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (): Object => ({});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    addImageToState: (image: Image) => {
      dispatch(addImageToState(image));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GalleryModal);
