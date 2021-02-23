import React, {useContext, useEffect} from "react"
import {View, Text, StyleSheet} from "react-native"
import {ScrollView} from "react-native-gesture-handler"
import {Avatar, Button, Divider, IconButton} from "react-native-paper"
import {ImageList} from "../../components/ImageList"
import {appStore} from "../../stores/appStore"
import {authStore, fetchMyPosts} from "../../stores/authStore"

const styles = StyleSheet.create({
  userInfo: {
    padding: 12
  },
  followInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20
  },
  followInfoItem: {
    alignItems: "center",
    marginLeft: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center"
  },
  bold: {
    fontWeight: "bold"
  },
  justifyCenter: {
    alignItems: "center"
  },
  displayname: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  grayText: {
    color: "#666"
  },
  sentence: {
    marginTop: 15,
    fontSize: 16
  },
  userData: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center"
  },
  userDataItem: {
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  divider: {
    marginVertical: 5
  },
  button: {
    alignSelf: "center",
    width: 200
  }
})

const FollowInfo = ({postCount}) => {
  return (
    <View style={styles.followInfoContainer}>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>{postCount ? postCount : 0}</Text>
        <Text>投稿</Text>
      </View>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>0</Text>
        <Text>フォロワー</Text>
      </View>
      <View style={styles.followInfoItem}>
        <Text style={styles.bold}>0</Text>
        <Text>フォロー中</Text>
      </View>
    </View>
  )
}

// eslint-disable-next-line complexity
const SelfIntroduction = ({user, M}) => {
  return (
    <View>
      <Text style={styles.displayname}>{user.nickname}</Text>
      <Text style={styles.grayText}>@{user.name}</Text>
      <Text style={styles.sentence} ellipsizeMode="tail" numberOfLines={6}>{user.self_introduction}</Text>
      <View style={styles.userData}>
        {user.face_type !== null && user.face_type !== "" && <View style={styles.userDataItem}><IconButton icon="face" size={15} style={{margin: 0}} color="#666" /><Text style={styles.grayText}>{M.face_type[user.face_type]}</Text></View>}
        {user.base_color !== null && user.base_color !== "" && <View style={styles.userDataItem}><IconButton icon="palette" size={15} style={{margin: 0}} color="#666" /><Text style={styles.grayText}>{M.base_color[user.base_color]}{M.season[user.season]}</Text></View>}
        {user.skin_type !== null && user.skin_type !== "" && <View style={styles.userDataItem}><Text style={styles.grayText}>{M.skin_type[user.skin_type]}</Text></View>}
      </View>
    </View>
  )
}


export const MyPage = ({navigation}) => {
  const {dispatch, state: {user}} = useContext(authStore)
  const {state: {masterData}} = useContext(appStore)

  useEffect(() => {
    fetchMyPosts(dispatch, user.user_id)
  }, [])

  return (
    <ScrollView>
      <View style={styles.userInfo}>
        <View style={styles.row}>
          <Avatar.Image size={80} source={user.thumbnail_img_src ? {uri: user.thumbnail_img_src} : require("../../../assets/no_image.png")} />
          <FollowInfo postCount={user.posts.length} />
        </View>
        <SelfIntroduction user={user} M={masterData} />
      </View>
      <Button
        mode="contained"
        icon="plus"
        onPress={() => navigation.navigate("PostScreen", {screen: "SelectImages"})}
        style={styles.button}
      >
        投稿する
      </Button>
      <Divider style={styles.divider} />
      <ImageList data={user.posts} />
    </ScrollView>
  )
}
