// @flow
import type { Beer } from "../../types/beer.types";

import React, { PureComponent } from "react";

import Form from "./form/Form";

import "./pages.scss";

type Props = {
  heading: string,
  submitHandler: Function,
  cancelHandler: Function,
  submitButtonLabel: string,
  cancelButtonLabel: string,
  currentBeer?: Beer,
  readOnly?: boolean
};

class Page extends PureComponent<Props> {
  render() {
    return (
      <section className="beer-page">
        <h1 className="beer-page__heading">{this.props.heading}</h1>
        <Form
          onSubmit={this.props.submitHandler}
          onCancel={this.props.cancelHandler}
          submitButtonLabel={this.props.submitButtonLabel}
          cancelButtonLabel={this.props.cancelButtonLabel}
          initialValues={this.props.currentBeer || {}}
          currentImage={this.props.currentBeer && this.props.currentBeer.image}
          readOnly={this.props.readOnly}
        />
      </section>
    );
  }
}

export default Page;
