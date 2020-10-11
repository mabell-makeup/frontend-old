import React from "react"
import {View, FlatList, StyleSheet, Text} from "react-native"

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#ececec",
    width: "33%",
    height: 100,
    marginVertical: 1,
    marginHorizontal: 1
  },
  title: {
    fontSize: 32
  }
})

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

export const ImageList = ({data}) => {
  const renderItem = ({item}) => (
    <Item title={item.title} />
  )

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      numColumns={3}
    />
  )
}
