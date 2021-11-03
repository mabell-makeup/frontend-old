/* eslint-disable max-lines-per-function */
import React, {useEffect, useState} from "react"
import {View, Text, StyleSheet, ScrollView} from "react-native"
import {Avatar, Divider, Button, IconButton} from "react-native-paper"
import {ImageList} from "../components/ImageList"
import {blockUser, fetchMyPosts, fetchPostCount, fetchUser} from "../stores/authStore"
import {fetchPostDetail, fetchPostUser, fetchUserPosts} from "../stores/postDetailStore"
import {useDispatch, useSelector} from "react-redux"
import {PullToRefresh} from "../components/PullToRefresh"
import {TextWithReadMore} from "../components/TextWithReadMore"
import {IconLabel} from "../components/IconLabel"
import {MORE_ICON} from "../styles/constants"
import {PopupMenu} from "../components/PopupMenu"

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
  displayname: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10
  },
  grayText: {
    color: "#666",
    fontSize: 12
  },
  sentence: {
    marginTop: 15,
    fontSize: 14
  },
  userData: {
    marginTop: 10,
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
    height: 30,
    width: "30%",
    margin: 5,
    justifyContent: "center"
  },
  buttonLabel: {
    fontSize: 10
  }
})

const FollowInfo = ({postCount}) => 
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


// eslint-disable-next-line complexity
const SelfIntroduction = ({user, M}) => {
  return (
    <View>
      <Text style={styles.displayname}>{user.nickname}</Text>
      <Text style={styles.grayText}>@{user.name}</Text>
      {user.self_introduction !== null && user.self_introduction !== "" && <TextWithReadMore style={styles.sentence} maxLineCount={3}>{user.self_introduction}</TextWithReadMore>}
      <View style={styles.userData}>
        {user.face_type !== null && user.face_type !== "" && <IconLabel icon="face" textStyle={styles.grayText}>{M.face_type[user.face_type]}</IconLabel>}
        {user.base_color !== null && user.base_color !== "" && <IconLabel icon="palette" textStyle={styles.grayText}>{M.base_color[user.base_color]}{M.season[user.season]}</IconLabel>}
        {user.skin_type !== null && user.skin_type !== "" && <View style={styles.userDataItem}><Text style={styles.grayText}>{M.skin_type[user.skin_type]}</Text></View>}
      </View>
    </View>
  )
}

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false)

  return <Button mode={isFollowing ? "contained" : "outlined"} style={styles.button} labelStyle={styles.buttonLabel} contentStyle={styles.buttonContentStyle} onPress={() => setIsFollowing(!isFollowing)}>{isFollowing ? "フォロー中" : "フォローする"}</Button>
}

const createData = (posts, navigation, dispatch, user_id) => posts && posts.map(post => ({
  ...post,
  id: post.id,
  onPress: async () => {
    await fetchPostDetail(dispatch, post.id, post.user_id, user_id)
    await navigation.navigate("PostDetail", {refreshFunc: async () => await fetchPostDetail(dispatch, post.id, post.user_id, user_id)})
  }
}))

// スクロールエンドの判定を行う
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
}

const refreshFunc = async (isMyPage, dispatch, user_id) => {
  if(isMyPage) {
    await Promise.all([
      fetchMyPosts(dispatch, user_id),
      // fetchPostCount(dispatch, user_id),
      fetchUser(dispatch, user_id)
    ])
  } else {
    await fetchPostUser(dispatch, user_id)
    await fetchUserPosts(dispatch, user_id)
  }
}

const menus = (isMyPage, dispatch, blockUserId, myId) => [
  !isMyPage && {title: "ブロックする", icon: "cancel", onPress: () => blockUser(dispatch, blockUserId, myId)}
]

// eslint-disable-next-line max-lines-per-function
// eslint-disable-next-line complexity
export const UserPage = ({navigation, route: {params}}) => {
  // TODO: user_idだけ受け取るようにする。自身のページ化の判断もuser_idの比較で行う。
  const isMyPage = typeof params !== "undefined" ? params.isMyPage : false
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)
  const myId = useSelector(({auth: {user: {user_id: myId}}}) => myId)
  const {user, nextToken, masterData} = isMyPage
    ? useSelector(({auth: {user, nextToken}, app: {masterData}}) => ({user, nextToken, masterData}))
    : useSelector(({postDetail: {postUser: user}, app: {masterData}}) => ({user, nextToken: "", masterData}))
  const data = createData(user.posts, navigation, dispatch, user.user_id)

  isMyPage && useEffect(() => navigation.addListener("focus", async () => await refreshFunc(isMyPage, dispatch, user.user_id)), [navigation])

  useEffect(() => {
    if (!isMyPage) {
      // eslint-disable-next-line react/display-name
      navigation.setOptions({headerRight: () => <IconButton style={styles.moreIcon} icon={MORE_ICON} onPress={() => setShowMenu(true)} />})
    }
  }, [isMyPage])

  return (
    <>
      <ScrollView
        onScroll={({nativeEvent}) => isCloseToBottom(nativeEvent) && nextToken && fetchMyPosts(dispatch, user.user_id, nextToken)}
        scrollEventThrottle={400}
        refreshControl={<PullToRefresh refreshFunc={async () => await refreshFunc(isMyPage, dispatch, user.user_id)} />}
      >
        <View style={styles.userInfo}>
          <View style={styles.row}>
            {/* eslint-disable-next-line no-undef */}
            <Avatar.Image size={80} source={user.thumbnail_img ? {uri: user.thumbnail_img} : require("../../assets/no_image.png")} />
            <FollowInfo postCount={isMyPage ? user.post_count : user.posts ? user.posts.length : 0} />
          </View>
          <SelfIntroduction user={user} M={masterData} />
          {!isMyPage && <FollowButton />}
        </View>
        <Divider style={styles.divider} />
        <ImageList data={data} scrollEnabled={false} />
      </ScrollView>
      {!isMyPage && <PopupMenu menus={menus(isMyPage, dispatch, user.user_id, myId)} handleShown={[showMenu, setShowMenu]} />}
    </>
  )
}
