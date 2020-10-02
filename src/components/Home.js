import React, {useMemo} from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {useQuery} from "@apollo/react-hooks"
import {gql} from "apollo-boost"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
})

export const Home = ({navigation}) => {
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
  
  const {loading, data} = useQuery(booksQuery)

  return (
    <View style={styles.container}>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Login")}>Go to Login</Button>
      {!loading ? data.books.map(book => <Text key={book.title}>{book.title}</Text>) : <Text>Loading...</Text>}
    </View>
  )
}
