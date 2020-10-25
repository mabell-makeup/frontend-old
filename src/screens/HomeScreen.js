import React, {useMemo} from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../styles/defaultStyle"
import {gql, useQuery} from "@apollo/client"
import {API_URI} from "@env"

const styles = StyleSheet.create(defaultStyle)

export const HomeScreen = ({navigation}) => {
  const itemsQuery = useMemo(
    () => gql`
      {
        posts {
          img_src
          user_name
        }
      }
    `,
    []
  )
  
  const {loading, data, error} = useQuery(itemsQuery)

  return (
    <View style={styles.container}>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Search")}>Go to Search</Button>
      {!loading ? error ? <Text>API Request Error</Text> : data.posts.map(post => <Text key={[post].img_src}>{post.img_src} {post.user_name}</Text>) : <Text>Loading...</Text>}
      <Text>{API_URI}</Text>
    </View>
  )
}
