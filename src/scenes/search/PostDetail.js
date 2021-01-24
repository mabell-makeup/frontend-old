import React, {useContext} from "react"
import {View, ScrollView, TouchableOpacity} from "react-native"
import {Title} from "react-native-paper"
import {Appbar, Avatar, Text, Button, IconButton} from "react-native-paper"
import {Platform} from "react-native"
import {Carousel} from "../../components/Carousel"
import {ChipList} from "../../components/ChipList"
import {updateFavoritePost, postStore} from "../../stores/postStore"

// TODO: Constantsに移動
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

// eslint-disable-next-line max-lines-per-function
const createStyles = favorite => ({
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
    marginTop: 6,
    paddingHorizontal: 10
  },
  description: {
    marginTop: 10,
    lineHeight: 30
  },
  strong: {
    fontWeight: "bold"
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10
  },
  userInfoTextContainer: {
    marginLeft: 10
  },
  userInfoNickname: {
    marginBottom: 2,
    fontSize: 16
  },
  userInfoName: {
    color: "#999"
  },
  userInfoFollow: {
    marginLeft: "auto"
  },
  button: {
    borderWidth: 1,
    paddingTop: 2,
    marginLeft: 0,
    borderColor: "#ccc",
  },
  favoriteButton: {
    borderColor: favorite ? "#FF7F50" : "#ccc",
  },
  buttonContainer: {
    flexDirection: "row"
  },
  tag: {
    marginTop: 20
  }
})

const PostHeader = ({postUser, navigation}) => {
  const styles = createStyles()

  return (
    <Appbar.Header>
      <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate("UserHome")}>
        <Avatar.Image size={38} source={{uri: postUser.thumbnail}} />
        <Appbar.Content 
          title={postUser.nickname}
          titleStyle={styles.userName}
          subtitle={`@${postUser.name}`}
          subtitleStyle={styles.userName}
        />
      </TouchableOpacity>
      <Appbar.Action style={styles.moreIcon} icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  )
}

const PostInfo = ({post, dispatch}) => {
  const styles = createStyles(post.favorite)

  return (
    <View style={styles.infoContainer}>
      <Text>いいね！ <Text style={styles.strong}>{post.page_views}</Text>件</Text>
      <View style={styles.buttonContainer}>
        <IconButton icon={post.favorite ? "heart" : "heart-outline"} style={[styles.button, styles.favoriteButton]} color={post.favorite ? "#FF7F50" : "#999"} onPress={() => updateFavoritePost(dispatch, post.post_id, !post.favorite)} />
        <IconButton icon="comment-outline" style={styles.button} color="#999" />
      </View>
      <Text style={styles.description}>{post.description}</Text>
      <View style={styles.tag}>
        <Title>タグ</Title>
        <ChipList items={post.tags.map(tags => ({label: tags}))} />
      </View>
    </View>
  )
}

const UserInfo = ({postUser, navigation}) => {
  const styles = createStyles()

  return (
    <View style={styles.userInfo}>
      <TouchableOpacity onPress={() => navigation.navigate("UserHome")}>
        <Avatar.Image size={50} source={{uri: postUser.thumbnail}} />
      </TouchableOpacity>
      <View style={styles.userInfoTextContainer}>
        <Text style={styles.userInfoNickname}>{postUser.nickname}</Text>
        <Text style={styles.userInfoName}>@{postUser.name}</Text>
      </View>
      <Button mode="outlined" style={styles.userInfoFollow}>フォローする</Button>
    </View>
  )
}

export const PostDetail = ({navigation}) => {
  const {dispatch, state: {post}} = useContext(postStore)
  const postUser = {nickname: post.user_nickname, name: post.user_name, id: post.user_id, thumbnail: post.user_thumbnail_img_src}

  return (
    <ScrollView>
      <PostHeader postUser={postUser} navigation={navigation} />
      <Carousel data={post.img_src_list} />
      <PostInfo post={post} dispatch={dispatch} />
      <UserInfo postUser={postUser} navigation={navigation} />
    </ScrollView>
  )
}
