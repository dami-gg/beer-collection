import React from 'react';
import Option from './Option';

import {StaticRouter as Router, Link} from 'react-router-dom';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('Option', () => {
  let component,
      element,
      mock;

  beforeEach(mocks);

  it('should render without crashing', () => {
    shallow(<Option url={mock.props.url} />);
  });

  it('should match the snapshot', () => {
    component = renderer.create(
        <Router context={mock.context}>
          <Option
              title={mock.props.title}
              url={mock.props.url}
              image={mock.props.image}>
          </Option>
        </Router>
    );
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render a Link component', () => {
      expect(component.find(Link).length).toEqual(1);
    });

    it('should have a link to the url specified in the props', () => {
      element = component.find(Link);

      expect(element.props().to).toEqual(mock.props.url);
    });

    it('should render an image with the source specified in the props', () => {
      element = component.find('.dashboard__option__image');

      expect(element.props().src).toEqual(mock.props.image);
    });

    it('should render a title with the value specified in the props', () => {
      element = component.find('.dashboard__option__title');

      expect(element.text()).toEqual(mock.props.title);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(
        <Option
            title={mock.props.title}
            url={mock.props.url}
            image={mock.props.image}>
        </Option>
    );
  }

  function mocks() {
    mock = {
      props: {
        url: {pathname: 'url'},
        image: 'IMAGE',
        title: 'TITLE'
      },
      context: {}
    };
  }
});

