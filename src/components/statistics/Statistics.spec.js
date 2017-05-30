import React from 'react';
import Statistics from './Statistics';
import Dashboard from '../dashboard/Dashboard';

import {StaticRouter as Router} from 'react-router-dom';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Statistics', () => {
  let component,
      element,
      mock;

  beforeEach(mocks);

  it('should render without crashing', () => {
    shallow(<Statistics />);
  });

  it('should match the snapshot', () => {
    component = renderer.create(
        <Router context={mock.context}>
          <Statistics/>
        </Router>
    );
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render a statistics element', () => {
      element = component.find('.statistics');

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
    component = shallow(<Statistics />);
  }

  function mocks() {
    mock = {
      context: {}
    };
  }
});

