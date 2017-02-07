import React from 'react';
import {App} from './App'; // Import the connected component with the curly braces

import {shallow} from 'enzyme';

xdescribe('App', () => {
  it('should render without crashing', () => {
    shallow(<App />);
  });
});
