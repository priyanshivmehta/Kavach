import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SideDrawerNavigator from './Navigation/SideDrawerNavigator';
import * as SplashScreen from 'expo-splash-screen';

import { useEffect, useState } from "react";
import GlobalProvider from "@/lib/global-provider";

const Layout = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Prevent auto-hide of splash screen
    SplashScreen.preventAutoHideAsync();

    // Simulate a loading time (e.g., 3 seconds for splash screen)
    const timer = setTimeout(() => {
      setIsAppReady(true);
      SplashScreen.hideAsync(); // Hide splash screen when ready
    }, 3000); // Adjust the time interval as needed

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (!isAppReady) {
    return null; // Keep the splash screen visible until the timer finishes
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalProvider>
        <SideDrawerNavigator />
      </GlobalProvider>
    </GestureHandlerRootView>
  );
};

export default Layout;
