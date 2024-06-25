import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import type { Movie } from '../../types/app'
import MovieItem from '../../components/movies/MovieItem'

const ShowMovies = ({ movies }: { movies: Movie[] }): JSX.Element => {
  const renderItem = ({ item }: { item: Movie }) => (
    <View>
      <MovieItem
        movie={item}
        size={{
          width: 100,
          height: 160,
        }}
        coverType="poster"
        key={item.title}
      />
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={3}
        columnWrapperStyle={styles.column}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    paddingHorizontal: 30,
    flex: 1,
  },
  column: {
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: 20,
  },
})

export default ShowMovies
