import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = ({ navigation }: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Page</Text>
      <Button
        title="GO TO MOVIE DETAIL"
        onPress={() => {
          navigation.navigate('MovieDetail')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
})

export default Home
