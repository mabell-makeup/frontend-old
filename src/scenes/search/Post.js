import React, {useContext} from "react"
import {View, StyleSheet, Image, Dimensions, ScrollView} from "react-native"
import {Chip, Title} from "react-native-paper"
import {Appbar, Avatar, Text} from "react-native-paper"
import {Platform} from "react-native"
import {searchStore} from "../../stores/searchStore"

// TODO: Constantsに移動
const ITEM_WIDTH = Dimensions.get("window").width
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12
  },
  chip: {
    margin: 4
  },
  image: {
    // TODO: もっといい書き方があるはず
    width: ITEM_WIDTH,
    height: 400
  },
  userName: {
    color: "#000"
  },
  moreIcon: {
    position: "absolute",
    right: 0
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row"
  },
  infoContainer: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  description: {
    marginVertical: 20,
    lineHeight: 30
  },
  strong: {
    fontWeight: "bold"
  }
})

const ChipList = ({items=[]}) =>
  <View style={styles.row}>
    {items.map(item => <Chip key={item} mode="outlined" style={styles.chip}>{item}</Chip>)}
  </View>

const PostHeader = ({userName, userId}) => {

  return (
    <Appbar.Header>
      <View style={styles.headerLeft}>
        <Avatar.Image size={38} source={{uri: "http://192.168.3.23:3000/img/posts/user3/1.jpg"}} />
        <Appbar.Content 
          title={userName}
          titleStyle={styles.userName}
          subtitle={"Subtitle"}
          subtitleStyle={styles.userName}
        />
      </View>
      <Appbar.Action style={styles.moreIcon} icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  )
}

const Info = ({post}) => {
  return (
    <View style={styles.infoContainer}>
      <Text>いいね！ <Text style={styles.strong}>{post.page_views}</Text>件</Text>
      <Text style={styles.description}>{post.description}</Text>
      <View>
        <Title>タグ</Title>
        <ChipList items={post.tags} />
      </View>
    </View>
  )
}

export const Post = () => {
  const {state: {post}} = useContext(searchStore)

  return (
    <ScrollView>
      <PostHeader userName={post.user_name} userId={post.user_id} />
      <Image
        source={{uri: "http://192.168.3.23:3000/img/posts/user3/1.jpg"}}
        style={styles.image}
      />
      <Info post={post} />
    </ScrollView>
  )
}

// TODO: 複数画像を表示
