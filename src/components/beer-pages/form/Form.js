// @flow
import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";

import Button from "../../common/button/Button";
import FormFields from "../form-fields/FormFields";
import ImageUploader from "../../common/image-uploader/ImageUploader";

import type { BeerFormValues } from "../../../types/beer.types";

import { handleImageUpload } from "../../common/image-uploader/image-uploader.helpers";

import "./form.scss";

type State = {
  imageFile: any,
  thumbnail: string
};

export class Form extends Component {
  state: State;
  preSubmit: Function;
  loadImage: Function;
  getThumbnail: Function;

  props: {
    onSubmit: Function,
    onCancel: Function,
    readOnly: boolean,
    submitButtonLabel: string,
    cancelButtonLabel: string,
    currentImage: string,
    handleSubmit: Function // redux-form automatically adds a method called handleSubmit to the props
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      imageFile: undefined,
      thumbnail: ""
    };

    this.preSubmit = this.preSubmit.bind(this);
    this.loadImage = this.loadImage.bind(this);
    this.getThumbnail = this.getThumbnail.bind(this);
  }

  /**
   * Prepares context before communicating to the parent component the submitted values which includes the
   * upload of the image to firebase (this cannot be done before in case the form is not submitted in the end)
   *
   * @param formValues
   */
  preSubmit(formValues: BeerFormValues) {
    handleImageUpload(this.state.imageFile)
      .then(imageUrl => this.props.onSubmit(formValues, imageUrl))
      .catch(error => console.log(error)); // TODO Handle error
  }

  loadImage(imageFile: Object) {
    this.setState({ imageFile });
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

          <ImageUploader
            onImageSelected={this.loadImage}
            thumbnail={this.state.thumbnail}
            readOnly={this.props.readOnly}
            currentImage={this.props.currentImage}
            onImageLoaded={this.getThumbnail}
            uploadButtonLabel="Upload image"
            galleryButtonLabel="Select from gallery"
          />
        </div>

        <div className="beer-form__buttons">
          <Button className="button--positive" type="submit" color="green">
            {this.props.submitButtonLabel || "Save"}
          </Button>

          <Button
            className="button--negative"
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
