import React from "react"
import {Text, View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../styles/defaultStyle"
import {API_URI} from "@env"
import {apiRequest} from "../helper/requestHelper"


const styles = StyleSheet.create(defaultStyle)

export const HomeScreen = ({navigation}) => {
  const query = `{
    suggestionItems(item_name: "hoge", limit: 20) {
        brand_name
        item_name
      }
  }`
  const {loading, data, error} = apiRequest(query)
  
  return (
    <View style={styles.container}>
      <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Search")}>Go to Search</Button>
      {!loading ? error ? <Text>{error.toString()}</Text> : data.suggestionItems.map(item => <Text key={item.item_name}>{item.brand_name} {item.item_name}</Text>) : <Text>Loading...</Text>}
      <Text>{API_URI}</Text>
    </View>
  )
}
