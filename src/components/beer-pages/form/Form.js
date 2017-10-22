// @flow

import type { BeerFormValues } from "../../../types/beer.types";
import type { Image } from "../../../types/image.types";

import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Button from "../../common/button/Button";
import FormFields from "../form-fields/FormFields";
import ImageSelector from "../../common/image-selector/ImageSelector";

import { uploadImage } from "../../common/image-selector/image-selector.helpers";

import "./form.scss";

type Props = {
  onSubmit: Function,
  onCancel: Function,
  readOnly: boolean,
  submitButtonLabel: string,
  cancelButtonLabel: string,
  currentImage: string,
  handleSubmit: Function // redux-form automatically adds a method called handleSubmit to the props
};

type State = {
  imageFile: any,
  thumbnail: string,
  imageSelected: boolean,
  imageUploaded: boolean
};

export class Form extends Component<Props, State> {
  preSubmit: Function;
  handleImageUpload: Function;
  handleImageSelection: Function;
  getThumbnail: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      imageFile: undefined,
      thumbnail: "",
      imageSelected: false,
      imageUploaded: false
    };

    this.preSubmit = this.preSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleImageSelection = this.handleImageSelection.bind(this);
    this.getThumbnail = this.getThumbnail.bind(this);
  }

  /**
   * Prepares context before communicating to the parent component the submitted values which includes the
   * upload of the image to firebase (this cannot be done before in case the form is not submitted in the end)
   *
   * @param formValues
   */
  preSubmit(formValues: BeerFormValues) {
    if (this.state.imageUploaded) {
      uploadImage(this.state.imageFile)
        .then(imageUrl => this.props.onSubmit(formValues, imageUrl))
        .catch(error => console.log(error)); // TODO Handle error
    } else {
      this.props.onSubmit(formValues, this.state.thumbnail);
    }
  }

  handleImageUpload(imageFile: Object) {
    this.setState({
      imageFile,
      imageUploaded: true,
      imageSelected: false
    });
  }

  handleImageSelection(image: Image) {
    this.setState({
      imageSelected: true,
      imageUploaded: false
    });
  }

  getThumbnail(thumbnail: string) {
    this.setState({ thumbnail });
  }

  render() {
    return (
      <form
        className="beer-form"
        onSubmit={this.props.handleSubmit(this.preSubmit)}>
        <div className="beer-form__inputs">
          <FormFields readOnly={this.props.readOnly} />

          <ImageSelector
            onImageUploaded={this.handleImageUpload}
            onImageSelected={this.handleImageSelection}
            thumbnail={this.state.thumbnail}
            readOnly={this.props.readOnly}
            currentImage={this.props.currentImage}
            onImageLoaded={this.getThumbnail}
            uploadButtonLabel="Upload image"
            galleryButtonLabel="Select from gallery"
          />
        </div>

        <div className="beer-form__buttons">
          <Button type="submit" color="green">
            {this.props.submitButtonLabel || "Save"}
          </Button>

          <Button
            color="red"
            onClick={this.props.onCancel}>
            {this.props.cancelButtonLabel || "Cancel"}
          </Button>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  initialValues: state.navigation.currentBeer || {}
});

export default connect(mapStateToProps)(
  reduxForm({
    form: "beerForm"
  })(Form)
);
