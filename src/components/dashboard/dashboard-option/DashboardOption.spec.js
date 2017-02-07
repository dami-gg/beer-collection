import React from 'react';
import DashboardOption from './DashboardOption';
import {Link} from 'react-router';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('DashboardOption', () => {
  let component;
  let elements;
  let mock;

  it('should render without crashing', () => {
    shallow(<DashboardOption />);
  });

  it('should match the snapshot', () => {
    component = renderer.create(<DashboardOption />);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render a Link component', () => {
      expect(component.find(Link).length).toEqual(1);
    });

    it('should have a link to the url specified in the props', () => {
      elements = component.find(Link);

      expect(elements.first().props().to).toEqual(mock.props.url);
    });

    it('should render an image with the source specified in the props', () => {
      elements = component.find('.dashboard__option__image');

      expect(elements.first().props().src).toEqual(mock.props.image);
    });

    it('should render a title with the value specified in the props', () => {
      elements = component.find('.dashboard__option__title');

      expect(elements.first().text()).toEqual(mock.props.title);
    });
  });

  function setup() {
    mocks();
    render();
  }

  function render() {
    component = shallow(
        <DashboardOption
          title={mock.props.title}
          url={mock.props.url}
          image={mock.props.image}
        />
    );
  }

  function mocks() {
    mock = {
      props: {
        url: 'URL',
        image: 'IMAGE',
        title: 'TITLE'
      }
    };
  }
});

