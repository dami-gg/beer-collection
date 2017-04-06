// @flow
import type {Beer} from '../../../types/types';

import React, {Component} from 'react';

import Form from '../beer-form/BeerForm';

class BeerPage extends Component {
  props: {
    heading: string,
    submitHandler: Function,
    cancelHandler: Function,
    submitButtonLabel: string,
    cancelButtonLabel: string,
    currentBeer: Beer
  };

  render() {
    return (
        <section>
          <h1>{this.props.heading}</h1>
          <Form
              onSubmit={this.props.submitHandler}
              onCancel={this.props.cancelHandler}
              submitButtonLabel={this.props.submitButtonLabel}
              cancelButtonLabel={this.props.cancelButtonLabel}
              currentImage={this.props.currentBeer && this.props.currentBeer.image}>
          </Form>
        </section>
    );
  }
}

export default BeerPage;
