import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { API_ACCESS_TOKEN } from '@env'
import type { Movie } from '../../types/app'
import ShowMovies from '../movies/ShowMovies'

const KeywordSearch = (): JSX.Element => {
  const [searchText, setSearchText] = useState('')
  const [submittedText, setSubmittedText] = useState('')
  const [movies, setMovies] = useState<Movie[]>([])
  const [status, setStatus] = useState('')

  const renderComponent = () => {
    switch (status) {
      case 'loading':
        return <ActivityIndicator size="large" />
      case 'success':
        return (
          <>
            {movies.length === 0 ? (
              <Text style={styles.noResults}>No results found</Text>
            ) : (
              <ShowMovies movies={movies} />
            )}
          </>
        )
      case 'error':
        return (
          <Text style={styles.errorText}>
            Something went wrong. Please try again with a correct city name.
          </Text>
        )
      default:
        return
    }
  }

  const getMovies = async (keyword: string): Promise<void> => {
    setStatus('loading')

    const encodedKeyword = encodeURIComponent(keyword)
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodedKeyword}`
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
        setMovies(data.results)
        setStatus('success')
      })
      .catch((error) => {
        console.log(error)
        setMovies([])
        setStatus('error')
      })
  }

  const handleSearchSubmit = () => {
    setSubmittedText(searchText)
    getMovies(searchText)
    Keyboard.dismiss()
  }

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearchSubmit}>
          <FontAwesome
            name="search"
            size={20}
            color="#000"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {submittedText !== '' && (
        <View style={styles.resultsContainer}>{renderComponent()}</View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
  },
  icon: {
    marginLeft: 10,
  },
  resultsContainer: {
    marginTop: 20,
  },
  noResults: {
    fontSize: 16,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
  },
})

export default KeywordSearch
