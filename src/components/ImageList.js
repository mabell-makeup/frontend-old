import React from "react"
import {FlatList, StyleSheet, View, Text} from "react-native"
import {Card} from "react-native-paper"
import {useSelector} from "react-redux"
import {WINDOW_WIDTH} from "../styles/constants"
import {IconLabel} from "./IconLabel"

const styles = StyleSheet.create({
  card: {
    width: (WINDOW_WIDTH - 20) / 2,
    marginHorizontal: 5,
    marginVertical: 5,
    resizeMode: "cover"
  },
  description: {
    fontSize: 10,
    color: "#333"
  },
  userInfo: {
    marginLeft: 7,
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center"
  },
  postInfo: {
    marginLeft: 5,
    flexDirection: "row",
    alignItems: "center"
  }
})

const Item = ({item, showUserInfo}) => {
  const M = useSelector(({app: {masterData}}) => masterData)

  return (
    <Card onPress={item.onPress} style={styles.card}>
      <Card.Cover source={item.imgSrc !== "" ? {uri: item.imgSrc} : require("../../assets/no_image.png")} />
      {showUserInfo &&
        <View style={styles.userInfo}>
          <Text style={styles.description}>
            {[M.base_color[item.base_color] + M.season[item.season],
              M.face_type[item.face_type],
              // M.skin_type[item.skin_type]
            ].filter(Boolean).join(" / ")}
          </Text>
        </View>}
      <View style={styles.postInfo}>
        <IconLabel icon="eye" textStyle={styles.description} size={12}>{item.page_views ? item.page_views : 0}</IconLabel>
        <IconLabel icon="heart" textStyle={styles.description} size={12}>{item.like_count ? item.like_count : 0}</IconLabel>
      </View>

    </Card>
  )
}

export const ImageList = ({data, style, onEndReached=()=>{}, scrollEnabled=true, showUserInfo=false, ...props}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <Item item={item} showUserInfo={showUserInfo} />}
      keyExtractor={(item, idx) => item.id + idx}
      numColumns={2}
      style={style}
      onEndReached={onEndReached}
      scrollEnabled={scrollEnabled}
      {...props}
    />
  )
}

