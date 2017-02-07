import React from 'react';
import Dashboard from './Dashboard';
import DashboardOption from './dashboard-option/DashboardOption';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Dashboard', () => {
  let component;

  it('should render without crashing', () => {
    shallow(<Dashboard />);
  });

  it('should match the snapshot', () => {
    component = renderer.create(<Dashboard />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render a dashboard element', () => {
      expect(component.find('.dashboard').length).toEqual(1);
    });

    it('should render two DashboardOption components', () => {
      expect(component.find(DashboardOption).length).toEqual(2);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(<Dashboard />);
  }
});

