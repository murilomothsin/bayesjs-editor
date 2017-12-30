import AppConnected, { App } from './index';
import { shallow } from 'enzyme';
import React from 'react';
import configureStore from '../../store/configureStore';

test('App should not be null', () => {
  expect( App ).toBeTruthy();
})

test('AppConnected should not be null', () => {
  expect( App ).toBeTruthy();
})

test('AppConnected should render', () => {
  const store = configureStore()
  const component = shallow(
    <AppConnected
      store={store}  />
  );

  expect( component ).toBeTruthy();
})