// @flow

import type { Beer } from "../../../types/beer.types";
import type { Image } from "../../../types/image.types";

import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../common/button/Button";
import FormFields from "../form-fields/FormFields";
import ImageSelector from "../../common/image-selector/ImageSelector";
import Ratings from "../ratings/Ratings";
import ErrorBoundary from "../../common/error-boundary/ErrorBoundary";

import { uploadImage } from "../../common/image-uploader/image-uploader.helpers";
import { addImageToState } from "../../../actions/gallery.actions";
import {
  showSuccessNotification,
  showErrorNotification
} from "../../../helpers/notifications.helpers";

import "./form.scss";

type Props = {
  onSubmit: Function,
  onCancel: Function,
  readOnly: boolean,
  submitButtonLabel: string,
  cancelButtonLabel: string,
  currentBeer?: Beer,
  currentImage: string,
  initialValues: any,
  addImageToState: Function
};

type State = {
  formValues: Object,
  imageFile: any,
  thumbnail: string,
  imageSelectedFromGallery: boolean,
  imageSelectedFromDisk: boolean
};

export class Form extends Component<Props, State> {
  state: State;
  preSubmit: Function;
  handleImageUpload: Function;
  handleImageSelection: Function;
  getThumbnail: Function;
  updateForm: Function;

  constructor(props: Props) {
    super(props);

    this.state = {
      formValues: props.initialValues,
      imageFile: undefined,
      thumbnail: "",
      imageSelectedFromGallery: false,
      imageSelectedFromDisk: false
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

    if (this.state.imageSelectedFromDisk) {
      uploadImage(this.state.imageFile)
        .then(imageUrl => {
          this.props.addImageToState({ url: imageUrl });
          this.props.onSubmit(this.state.formValues, imageUrl);

          showSuccessNotification("The image has been successfully uploaded");
        })
        .catch(error => {
          console.log(error); // TODO Handle error
          showErrorNotification("The image could not be uploaded");
        });
    } else {
      this.props.onSubmit(this.state.formValues, this.state.thumbnail);
    }
  }

  handleImageUpload(imageFile: Object) {
    this.setState({
      imageFile,
      imageSelectedFromDisk: true,
      imageSelectedFromGallery: false
    });
  }

  handleImageSelection(image: Image) {
    this.setState({
      imageSelectedFromGallery: true,
      imageSelectedFromDisk: false
    });
  }

  getThumbnail(thumbnail: string) {
    this.setState({ thumbnail });
  }

  updateForm(field: string, value: any) {
    const currentValues = this.state.formValues;
    currentValues[field] = value;

    this.setState({ formValues: currentValues });
  }

  render() {
    return (
      <form className="form" onSubmit={event => this.preSubmit(event)}>
        <div className="form__inputs">
          <ErrorBoundary>
            <FormFields
              fields={["name", "type", "origin"]} // TODO Make this generic
              values={this.state.formValues}
              readOnly={this.props.readOnly}
              onChange={this.updateForm}>
              <Ratings
                readOnly={this.props.readOnly}
                currentValue={
                  this.state.formValues && this.state.formValues["rating"]
                }
                onChange={this.updateForm}
              />
            </FormFields>
          </ErrorBoundary>

          <ErrorBoundary>
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
          </ErrorBoundary>
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

const mapStateToProps = (): Object => ({});

const mapDispatchToProps = (dispatch: Function): Object => {
  return {
    addImageToState: (image: Image) => {
      dispatch(addImageToState(image));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
