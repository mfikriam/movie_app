import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

const HomeStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="MoviePage">
      <Stack.Screen
        name="Movie"
        component={Home}
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="MovieDetail"
        component={MovieDetail}
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigation
