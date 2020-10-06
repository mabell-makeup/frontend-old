import * as React from "react"
import {View} from "react-native"
import {StyleSheet} from "react-native"
import {Button} from "react-native-paper"
import {defaultStyle} from "../../styles/defaultStyle"

const styles = StyleSheet.create(defaultStyle)

export const Home = ({navigation}) => 
  <View style={styles.container}>
    <Button icon="pencil" mode="contained" onPress={() => navigation.navigate("Search")}>Go to Search</Button>
  </View>