import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "./screens/Home";
import AddOrder from "./screens/AddOrder";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFontLoaded] = useFonts({
    'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
    'poppins-bold': require('./assets/fonts/Poppins/Poppins-Bold.ttf'),
    'poppins-bold-2': require('./assets/fonts/Poppins/Poppins-ExtraBold.ttf'),
  });

  console.log({ isFontLoaded })
  if (!isFontLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  return (
    <>
    <StatusBar />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Home"} component={Home} options={{ headerShown: false }} />
        <Stack.Screen name={"AddOrder"} component={AddOrder} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};
