/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

StatusBar.setBackgroundColor('#FFF')
AppRegistry.registerComponent(appName, () => App);
