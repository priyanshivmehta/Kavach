import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNavigator from './BottomNavigator'; // Import your Bottom Tab Navigator
import SideNavigator from './SideDrawerNavigator'; // Import your Drawer (SideNavigator)
import HomePage from '../(tabs)/HomePage';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [authState, setAuthState] = useState('signup'); // 'signup', 'login', or 'home'

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const savedState = await AsyncStorage.getItem('authState');
        if (savedState) {
          setAuthState(savedState);
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
      }
    };

    checkStatus();
  }, []);

  const handleAuthStateChange = async (newState: string) => {
    setAuthState(newState);
    await AsyncStorage.setItem('authState', newState);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomePage">
          {(props) => (
            <HomePage
              {...props}
              authState={authState}
              setAuthState={handleAuthStateChange}
            />
          )}
        </Stack.Screen>
        {/* You can also show your BottomNavigator after user is logged in */}
        <Stack.Screen
          name="BottomTabs"
          component={BottomNavigator}
          options={{ headerShown: false }}
        />
        {/* Or your Drawer navigator */}
        <Stack.Screen
          name="Drawer"
          component={SideNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
