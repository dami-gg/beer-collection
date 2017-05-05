// @flow

import React, {Component} from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {reduxForm} from 'redux-form';

import Button from '../../button/Button';
import BeerFormInputFields from './BeerFormFields';
import BeerImageInput from '../beer-image/BeerImageInput'

import type {BeerFormValues} from '../../../types';

import './beer-form.scss';

class BeerForm extends Component {
  props: {
    onSubmit: Function,
    onCancel: Function,
    readOnly: boolean,
    submitButtonLabel: string,
    cancelButtonLabel: string,
    currentImage: string
  };

  constructor(props) {
    super(props);

    this.state = {
      imageFile: '',
      thumbnail: ''
    };

    this.preSubmit = this.preSubmit.bind(this);
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
    this.handleImageUpload()
        .then(imageUrl => this.props.onSubmit(formValues, imageUrl))
        .catch(error => console.log(error)); // TODO Handle error
  }

  handleImageSelection(event) {
    event.persist();
    const file = event.target.files[0];

    this.setState({
      imageFile: file
    });

    this.readFile(file, this.getThumbnail);
  }

  getThumbnail(thumbnail) {
    this.setState({
      thumbnail: thumbnail
    });
  }

  readFile(file, callback) {
    const reader = new FileReader();

    reader.onload = () => callback(reader.result);

    reader.readAsDataURL(file);
  }

  handleImageUpload() {
    return new Promise((resolve, reject) => {
      const file = this.state.imageFile;

      if (file) {
        const storageRef = firebase.storage().ref(`/beer-images/${file.name}`);
        const uploadProcess = storageRef.put(file);

        uploadProcess.on(firebase.storage.TaskEvent.STATE_CHANGED,
            snapshot => {
              // Uploading
              let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(progress);
            },
            error => {
              // TODO Handle error
              reject(error);
            },
            () => {
              // Upload is complete
              resolve(uploadProcess.snapshot.downloadURL);
            }
        );
      }

      else {
        resolve('');
      }
    });
  }

  render() {
    const {handleSubmit} = this.props; // redux-form automatically adds a method called handleSubmit to the props
    return (
        <form className="beer-form"
              onSubmit={handleSubmit(this.preSubmit)}>
          <div className="beer-form__inputs">
            <BeerFormInputFields
                readOnly={this.props.readOnly}>
            </BeerFormInputFields>

            <BeerImageInput
                handleImageSelection={this.handleImageSelection}
                thumbnail={this.state.thumbnail}
                readOnly={this.props.readOnly}
                currentImage={this.props.currentImage}>
            </BeerImageInput>
          </div>

          <div className="beer-form__buttons">
            <Button
                type="submit"
                color="green">
              { this.props.submitButtonLabel || 'Save'}
            </Button>

            <Button
                color="red"
                onClick={this.props.onCancel}>
              { this.props.cancelButtonLabel || 'Cancel'}
            </Button>
          </div>
        </form>
    );
  }
}

const mapStateToProps = (state: Object): Object => ({
  initialValues: state.navigation.currentBeer || {}
});

export default connect(
    mapStateToProps
)(reduxForm({
  form: 'beerForm'
})(BeerForm));

