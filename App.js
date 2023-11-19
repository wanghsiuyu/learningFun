import React from "react";
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import {
  MainLayout
} from "./src/screens";

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
        initialRouteName={'Dashboard'}
      >
        <Stack.Screen
          name="Dashboard"
          component={MainLayout}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App