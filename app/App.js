import React, { Component  } from 'react';
import { AppRegistry } from 'react-native';

import { StackNavigator } from 'react-navigation';
import Main from './Main';
import DescriptionForm from './DescriptionForm'; 

const App = StackNavigator({
    Main: { screen: Main },
    DescriptionForm: { screen: DescriptionForm },
});

export default App; 