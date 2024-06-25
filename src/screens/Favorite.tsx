import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import type { Movie } from '../types/app'
import ShowMovies from '../components/movies/ShowMovies'

const Favorite = (): JSX.Element => {
  const [favorites, setFavorites] = useState<Movie[]>([])

  const loadFavorites = async (): Promise<void> => {
    try {
      const initialData: string | null =
        await AsyncStorage.getItem('@FavoriteList')
      if (initialData !== null) {
        const favMovieList: Movie[] = JSON.parse(initialData)
        setFavorites(favMovieList)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadFavorites()
    }, []),
  )

  // console.log()
  // console.log(favorites.map((movie) => movie.title))
  // console.log(`Count Favorites: ${favorites.length}`)

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite movies found</Text>
      ) : (
        <ShowMovies movies={favorites} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
})

export default Favorite
