import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieDetail = ({ navigation }: any): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Movie Detail Page</Text>
      <Button
        title="BACK"
        onPress={() => {
          navigation.navigate('Movie')
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

export default MovieDetail
