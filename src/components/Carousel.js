import React, {useState} from "react"
import {StyleSheet, View} from "react-native"
import {FlatList, Image, Dimensions} from "react-native"


// TODO: Constantsに移動
const ITEM_WIDTH = Dimensions.get("window").width

const styles = StyleSheet.create({
  image: {
    // TODO: もっといい書き方があるはず
    width: ITEM_WIDTH,
    height: 400
  },
  pagination: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 10
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2
  },
  paginationDotActive: {backgroundColor: "lightblue"},
  paginationDotInactive: {backgroundColor: "gray"}
})

const Pagination = ({index, imgCount}) => {
  return (
    <View style={styles.pagination} pointerEvents="none">
      {[...Array(imgCount).keys()].map(i => 
        <View
          key={i}
          style={[
            styles.paginationDot,
            index === i
              ? styles.paginationDotActive
              : styles.paginationDotInactive
          ]}
        ></View>
      )}
    </View>
  )
}

const onScroll = setIndex => event => {
  const slideSize = event.nativeEvent.layoutMeasurement.width
  const index = Math.round(event.nativeEvent.contentOffset.x / slideSize)
  setIndex(index)
}

export const Carousel = ({data}) => {
  const [index, setIndex] = useState(0)

  return (
    <>
      <FlatList
        data={data}
        style={{flex: 1}}
        renderItem={({item}) => {
          return <Image
            source={{uri: item}}
            style={styles.image}
          />
        }}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll(setIndex)}
      />
      <Pagination index={index} imgCount={data.length} />
    </>
  )
}