/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useContext,useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'

import HomePage from '../components/HomePage';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';
import ChatPage from '../components/ChatPage';

import { AuthContext } from '../components/AuthProvider';
import AuthProvider from '../components/AuthProvider';
import { useEffect } from 'react';


const Stack = createStackNavigator();

const AppStackMaintain = () => {

  const { user, setUser } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = (user) => {
    setUser(user);
    if(initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
          {user ? <Stack.Navigator initialRouteName="HomePage">
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="ChatPage" component={ChatPage} />
            <Stack.Screen name="HomePage" options={{headerShown: false}} component={HomePage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
          </Stack.Navigator>
          :
            <Stack.Navigator initialRouteName="LogingPage">
            <Stack.Screen name="LoginPage" component={LoginPage} />
            <Stack.Screen name="HomePage" component={HomePage} />
            <Stack.Screen name="RegisterPage" component={RegisterPage} />
          </Stack.Navigator>} 
    </NavigationContainer>
  );
};



export default AppStackMaintain;
