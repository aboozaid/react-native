import React from 'react';
import ColorList from './components/ColorList';
import ColorInfo from './components/ColorInfo';
import Web from './components/Web';
import { StackNavigator } from 'react-navigation';

const App = StackNavigator({
  Home: { screen: ColorList },
  Details: { screen: ColorInfo },
  Web: { screen: Web }
});

export default App;