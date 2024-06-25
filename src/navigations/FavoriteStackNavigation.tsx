import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Favorite from '../screens/Favorite'
import MovieDetail from '../screens/MovieDetail'

const Stack = createNativeStackNavigator()

const FavoriteStackNavigation = (): JSX.Element => {
  return (
    <Stack.Navigator initialRouteName="Favorite Page">
      <Stack.Screen
        name="Favorite Page"
        component={Favorite}
        options={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 300,
        }}
      />
      <Stack.Screen
        name="Movie Detail"
        component={MovieDetail}
        options={{
          animation: 'fade',
          animationDuration: 300,
        }}
      />
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigation
