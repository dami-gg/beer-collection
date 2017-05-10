import React from 'react';
import FloatingButton from './FloatingButton';

import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('FloatingButton', () => {
  let component,
      element,
      mock;

  beforeEach(mocks);

  it('should render without crashing', () => {
    shallow(<FloatingButton></FloatingButton>);
  });

  it('should match the snapshot', () => {
    component = renderer.create(<FloatingButton></FloatingButton>);
    let json = component.toJSON();

    expect(json).toMatchSnapshot();
  });

  describe('render', () => {
    beforeEach(setup);

    it('should render an element which on click calls the click handler', () => {
      element = component.find('.floating-button__button');
      element.simulate('click');

      expect(mock.props.clickHandler).toHaveBeenCalled();
    });

    it('should render an element with an icon with the class specified in props', () => {
      element = component.find('.floating-button__button');
      element = element.find('.floating-button__button__icon');

      expect(element.hasClass(mock.props.iconClass)).toBe(true);
    });

    it('should render an element with the label specified in props', () => {
      element = component.find('.floating-button__label__text');

      expect(element.text()).toBe(mock.props.label);
    });
  });

  function setup() {
    render();
  }

  function render() {
    component = shallow(
        <FloatingButton
            iconClass={mock.props.iconClass}
            label={mock.props.label}
            clickHandler={mock.props.clickHandler}
            buttonColor={mock.props.buttonColor}
            iconColor={mock.props.iconColor}>
        </FloatingButton>
    );
  }

  function mocks() {
    mock = {
      props: {
        iconClass: 'class',
        label: 'label',
        clickHandler: jest.fn(),
        buttonColor: 'color',
        iconColor: 'color'
      }
    };
  }
});

