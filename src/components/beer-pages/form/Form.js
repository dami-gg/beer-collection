// @flow

import type { Beer } from "../../../types/beer.types";
import type { Image } from "../../../types/image.types";

import React, { Component } from "react";

import Button from "../../common/button/Button";
import FormFields from "../form-fields/FormFields";
import ImageSelector from "../../common/image-selector/ImageSelector";
import Rating from "../rating/Rating";

import { uploadImage } from "../../common/image-selector/image-selector.helpers";

import "./form.scss";

type Props = {
  onSubmit: Function,
  onCancel: Function,
  readOnly: boolean,
  submitButtonLabel: string,
  cancelButtonLabel: string,
  currentBeer: Beer,
  currentImage: string,
  initialValues: any
};

type State = {
  formValues: Object,
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
      formValues: props.initialValues,
      imageFile: undefined,
      thumbnail: "",
      imageSelected: false,
      imageUploaded: false
    };

    this.preSubmit = this.preSubmit.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleImageSelection = this.handleImageSelection.bind(this);
    this.getThumbnail = this.getThumbnail.bind(this);
    this.updateForm = this.updateForm.bind(this);
  }

  /**
   * Prepares context before communicating to the parent component the submitted values which includes the
   * upload of the image to firebase (this cannot be done before in case the form is not submitted in the end)
   */
  preSubmit(event: Object) {
    event.preventDefault();

    if (this.state.imageUploaded) {
      uploadImage(this.state.imageFile)
        .then(imageUrl => this.props.onSubmit(this.state.formValues, imageUrl))
        .catch(error => console.log(error)); // TODO Handle error
    } else {
      this.props.onSubmit(this.state.formValues, this.state.thumbnail);
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

  updateForm(field, value) {
    const currentValues = this.state.formValues;
    currentValues[field] = value;

    this.setState({ formValues: currentValues });
  }

  render() {
    return (
      <form className="form" onSubmit={event => this.preSubmit(event)}>
        <div className="form__inputs">
          <FormFields
            fields={["name", "type", "origin"]} // TODO Make this generic
            values={this.state.formValues}
            readOnly={this.props.readOnly}
            onChange={this.updateForm}>
            <Rating readOnly={this.props.readOnly} />
          </FormFields>

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

        <div className="form__buttons">
          <Button type="submit" color="green">
            {this.props.submitButtonLabel || "Save"}
          </Button>

          <Button color="red" onClick={this.props.onCancel}>
            {this.props.cancelButtonLabel || "Cancel"}
          </Button>
        </div>
      </form>
    );
  }
}

export default Form;
