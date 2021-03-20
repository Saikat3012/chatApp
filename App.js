/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useContext,useState} from 'react';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AppStackMaintain from './appStack/AppStackMaintain';
import { AuthProvider } from './components/AuthProvider';



const Stack = createStackNavigator();

const App = () => {

  

  return (
    
      <AuthProvider>
          <AppStackMaintain/>
      </AuthProvider>   
  );
};



export default App;
