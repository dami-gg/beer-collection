// @flow
import type {Beer} from '../../../types';

import React, {Component} from 'react';

import Form from './form/Form';

import './pages.scss';

class Page extends Component {
  props: {
    heading: string,
    submitHandler: Function,
    cancelHandler: Function,
    submitButtonLabel: string,
    cancelButtonLabel: string,
    currentBeer: Beer,
    readOnly: boolean
  };

  render() {
    return (
        <section className="beer-page">
          <h1 className="beer-page__heading">{this.props.heading}</h1>
          <Form
              onSubmit={this.props.submitHandler}
              onCancel={this.props.cancelHandler}
              submitButtonLabel={this.props.submitButtonLabel}
              cancelButtonLabel={this.props.cancelButtonLabel}
              currentImage={this.props.currentBeer && this.props.currentBeer.image}
              readOnly={this.props.readOnly}>
          </Form>
        </section>
    );
  }
}

export default Page;
