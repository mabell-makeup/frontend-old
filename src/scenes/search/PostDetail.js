import React, {useContext} from "react"
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
import {Title} from "react-native-paper"
import {Appbar, Avatar, Text, Button} from "react-native-paper"
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
  }
})

const PostHeader = ({user, navigation}) => {
  return (
    <Appbar.Header>
      <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate("UserHome")}>
        <Avatar.Image size={38} source={{uri: user.thumbnail}} />
        <Appbar.Content 
          title={user.nickname}
          titleStyle={styles.userName}
          subtitle={`@${user.name}`}
          subtitleStyle={styles.userName}
        />
      </TouchableOpacity>
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

const UserInfo = ({user, navigation}) => {
  return (
    <View style={styles.userInfo}>
      <TouchableOpacity onPress={() => navigation.navigate("UserHome")}>
        <Avatar.Image size={50} source={{uri: user.thumbnail}} />
      </TouchableOpacity>
      <View style={styles.userInfoTextContainer}>
        <Text style={styles.userInfoNickname}>{user.nickname}</Text>
        <Text style={styles.userInfoName}>@{user.name}</Text>
      </View>
      <Button mode="outlined" style={styles.userInfoFollow}>フォローする</Button>
    </View>
  )
}

export const PostDetail = ({navigation}) => {
  const {state: {post}} = useContext(searchStore)
  const user = {nickname: post.user_nickname, name: post.user_name, id: post.user_id, thumbnail: post.user_thumbnail_img_src}

  return (
    <ScrollView>
      <PostHeader user={user} navigation={navigation} />
      <Carousel data={post.img_src_list} />
      <PostInfo post={post} />
      <UserInfo user={user} navigation={navigation} />
    </ScrollView>
  )
}
