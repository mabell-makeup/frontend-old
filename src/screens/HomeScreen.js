import React, {useMemo} from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../styles/defaultStyle"
import {gql, useQuery} from "@apollo/client"
import {API_URI} from "@env"

const styles = StyleSheet.create(defaultStyle)

export const HomeScreen = ({navigation}) => {
  const booksQuery = useMemo(
    () => gql`
      {
        books {
          title
          author
        }
      }
    `,
    []
  )
  
  const {loading, data, error} = useQuery(booksQuery)

  return (
    <View style={styles.container}>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Search")}>Go to Search</Button>
      {!loading ? error ? <Text>API Request Error</Text> : data.books.map(book => <Text key={book.title}>{book.title}</Text>) : <Text>Loading...</Text>}
      <Text>{API_URI}</Text>
    </View>
  )
}
