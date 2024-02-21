/**
 * @format
 */
//mnt
import {AppRegistry} from 'react-native';
import React from 'react';
import App from './App';
import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, () => login)

/*
const product = [
    { 
        productName: 'iphone 5',
        year: 2015
    },
    { 
        productName: 'iphone 6',
        year: 2016
    },
    { 
        productName: 'iphone 7',
        year: 2017
    }
]
AppRegistry.registerComponent(appName, 
    () => () => <Login 
                        x = {6} 
                        y = {2} 
                        person = {{ 
                            name: 'Trương Chí Nghiệm',
                            age: 18,
                            email: 'nghiemtc@gmail.com'
                         }}
                        products = {product}
                />);
*/

AppRegistry.registerComponent(appName, () => () => <App></App>);
