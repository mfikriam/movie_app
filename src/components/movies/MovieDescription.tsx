import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ImageBackground } from 'react-native'
import type { Movie } from '../../types/app'
import { API_ACCESS_TOKEN } from '@env'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieColumn = ({ title, content }: any): JSX.Element => {
  return (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{title}</Text>
      <Text>{content}</Text>
    </View>
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MovieDescription = ({ movieId }: any): JSX.Element => {
  const [movie, setMovie] = useState<Movie>()

  useEffect(() => {
    getMovie()
  }, [])

  const getMovie = (): void => {
    const url = `https://api.themoviedb.org/3/movie/${movieId}`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((data) => {
        setMovie(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <View>
      {movie && (
        <View>
          <ImageBackground
            resizeMode="cover"
            style={styles.backgroundImage}
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
            }}
          >
            <LinearGradient
              colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
              locations={[0.6, 0.8]}
              style={styles.gradientStyle}
            >
              <Text style={styles.movieTitle}>{movie.title}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={20} color="yellow" />
                <Text style={styles.rating}>
                  {movie.vote_average.toFixed(1)}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>

          <View style={styles.container}>
            <Text style={styles.movieOverview}>{movie.overview}</Text>

            <View style={styles.row}>
              <MovieColumn
                title="Original Language"
                content={movie.original_language}
              />
              <MovieColumn
                title="Popularity"
                content={movie.popularity.toFixed(2)}
              />
            </View>
            <View style={styles.row}>
              <MovieColumn title="Release Date" content={movie.release_date} />
              <MovieColumn title="Vote Count" content={movie.vote_count} />
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 12,
  },
  backgroundImage: {
    width: '100%',
    height: 250,
  },
  movieTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 3,
  },
  gradientStyle: {
    padding: 20,
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    color: 'yellow',
    fontWeight: '700',
    fontSize: 18,
  },
  movieOverview: {
    color: 'black',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 10,
  },
  columnTitle: {
    color: 'black',
    fontWeight: '900',
  },
})

export default MovieDescription
