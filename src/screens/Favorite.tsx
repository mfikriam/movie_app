import React, { useState, useCallback } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import type { Movie } from '../types/app'
import MovieItem from '../components/movies/MovieItem'

export default function Favorite(): JSX.Element {
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
        data={favorites}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={3}
        columnWrapperStyle={styles.row}
        // contentContainerStyle={styles.list}
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
  // list: {
  //   justifyContent: 'flex-start',
  // },
  row: {
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: 20,
  },
})
