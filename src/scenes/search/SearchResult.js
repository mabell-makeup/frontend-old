import React from "react"
import {ImageList} from "../../components/ImageList"
import {fetchPosts, updateSearchResult} from "../../stores/searchStore"
import {fetchPostDetail} from "../../stores/postDetailStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"
import {useDispatch, useSelector} from "react-redux"
import {PullToRefresh} from "../../components/PullToRefresh"
import {StyleSheet, View} from "react-native"
import {DropDownMenu} from "../../components/DropDownMenu"

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
    marginTop: 35
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

const SearchHeader = () => {
  return (
    <View style={styles.header}>
      <DropDownMenu icon="account" style={styles.headerItem} items={[{label: "MEN", onPress:() => {}}, {label: "WOMEN", onPress:() => {}}]}>MEN</DropDownMenu>
      <DropDownMenu icon="sort" style={styles.headerItem} items={[{label: "MEN", onPress:() => {}}, {label: "WOMEN", onPress:() => {}}]}>人気順</DropDownMenu>
      <DropDownMenu icon="tune" style={styles.headerItem} items={[{label: "MEN", onPress:() => {}}, {label: "WOMEN", onPress:() => {}}]}>絞り込む</DropDownMenu>
    </View>
  )
}

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