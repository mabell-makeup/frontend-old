import React, {useContext} from "react"
import {View, StyleSheet, ScrollView} from "react-native"
import {Title} from "react-native-paper"
import {Appbar, Avatar, Text} from "react-native-paper"
import {Platform} from "react-native"
import {searchStore} from "../../stores/searchStore"
import {Carousel} from "../../components/Carousel"
import {ChipList} from "../../components/ChipList"

// TODO: Constantsに移動
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

const styles = StyleSheet.create({
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

const PostInfo = ({post}) => {
  return (
    <View style={styles.infoContainer}>
      <Text>いいね！ <Text style={styles.strong}>{post.page_views}</Text>件</Text>
      <Text style={styles.description}>{post.description}</Text>
      <View>
        <Title>タグ</Title>
        <ChipList items={post.tags.map(tags => ({label: tags}))} />
      </View>
    </View>
  )
}

export const Post = () => {
  const {state: {post}} = useContext(searchStore)

  return (
    <ScrollView>
      <PostHeader userName={post.user_name} userId={post.user_id} />
      <Carousel data={post.img_src_list} />
      <PostInfo post={post} />
    </ScrollView>
  )
}
