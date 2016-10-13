import React, {Component} from 'react';
import {FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap';

class BeerAdd extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      type: '',
      country: ''
    };
  }

  handleChange = (property, value) => {
    this.setState({...this.state, [property]: value});
  };

  render() {
    return (
        <section className="beer beer--add">
          <h1>Add a new beer to the collection</h1>
          <form>
            <FormGroup
                controlId="beerName">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                  type="text"
                  value={this.state.name}
                  placeholder="Enter name"
                  onChange={this.handleChange}
              />
            </FormGroup>
            <Button
                type="submit"
                bsStyle="primary">
              Submit
            </Button>
          </form>
        </section>
    );
  }
}

export default BeerAdd;
