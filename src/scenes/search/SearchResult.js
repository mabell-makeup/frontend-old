import React from "react"
import {ImageList} from "../../components/ImageList"
import {fetchPosts, updateSearchResult} from "../../stores/searchStore"
import {fetchPostDetail} from "../../stores/postDetailStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"
import {useDispatch, useSelector} from "react-redux"
import {PullToRefresh} from "../../components/PullToRefresh"
import {StyleSheet, View} from "react-native"
import {IconLabel} from "../../components/IconLabel"

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd"
  },
  headerItem: {
    // flexBasis: "auto"
  }
})

const createDataWithNavigation = (searchResult, navigation, dispatch, user_id) => searchResult.map(post => ({
  ...post,
  onPress: async () => {
    await fetchPostDetail(dispatch, post.id, post.DateTime, user_id)
    navigation.navigate("PostDetail", {refreshFunc: async () => await fetchPostDetail(dispatch, post.id, post.DateTime, user_id)})
  }
}))

const loadMore = (dispatch, tmpConditions, nextToken) => async () => {
  if (nextToken !== "") {
    await fetchPosts(dispatch, tmpConditions, nextToken)
    await updateSearchResult(dispatch)
  }
}

const SearchHeader = () => (
  <View style={styles.header}>
    <IconLabel icon="account" size={20} style={styles.headerItem}>男性</IconLabel>
    <IconLabel icon="sort" size={20} style={styles.headerItem}>人気順</IconLabel>
    <IconLabel icon="tune" size={20} style={styles.headerItem}>絞り込む</IconLabel>
  </View>
)

export const SearchResult = ({navigation}) => {
  const dispatch = useDispatch()
  const {searchResult, tmpConditions, nextToken, user_id} = useSelector(({
    search: {searchResult, tmpConditions, nextToken}, auth: {user: {user_id}}
  }) => ({searchResult, tmpConditions, nextToken, user_id}))

  return (
    <>
      <SearchHeader />
      <ImageList
        data={createDataWithNavigation(searchResult, navigation, dispatch, user_id)}
        onEndReached={loadMore(dispatch, tmpConditions, nextToken)}
        refreshControl={<PullToRefresh refreshFunc={loadMore(dispatch, tmpConditions, false)} />}
        showUserInfo={true}
      />
      {/* <UserInfoToggleGroup /> */}
    </>
  )
}