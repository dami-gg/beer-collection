import React from 'react';
import Home from './Home';
import Dashboard from '../dashboard/Dashboard';

import {StaticRouter as Router} from 'react-router-dom';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Home', () => {
  let component,
      element,
      mock;

  beforeEach(mocks);

  it('should render without crashing', () => {
    shallow(<Home />);
  });

  it('should match the snapshot', () => {
    component = renderer.create(
        <Router context={mock.context}>
          <Home/>
        </Router>
    );
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render a home element', () => {
      element = component.find('.home');

      expect(element.length).toEqual(1);
    });

    it('should render a Dashboard component', () => {
      element = component.find(Dashboard);

      expect(element.length).toEqual(1);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(<Home />);
  }

  function mocks() {
    mock = {
      context: {}
    };
  }
});

