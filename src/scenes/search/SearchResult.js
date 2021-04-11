import React from "react"
import {ImageList} from "../../components/ImageList"
import {fetchPosts, updateSearchResult} from "../../stores/searchStore"
import {fetchPostDetail} from "../../stores/postDetailStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"
import {useDispatch, useSelector} from "react-redux"
import {PullToRefresh} from "../../components/PullToRefresh"

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

export const SearchResult = ({navigation}) => {
  const dispatch = useDispatch()
  const {searchResult, tmpConditions, nextToken, user_id} = useSelector(({
    search: {searchResult, tmpConditions, nextToken}, auth: {user: {user_id}}
  }) => ({searchResult, tmpConditions, nextToken, user_id}))

  return (
    <>
      <ImageList
        data={createDataWithNavigation(searchResult, navigation, dispatch, user_id)}
        onEndReached={loadMore(dispatch, tmpConditions, nextToken)}
        refreshControl={<PullToRefresh refreshFunc={loadMore(dispatch, tmpConditions, false)} />}
      />
      {/* <UserInfoToggleGroup /> */}
    </>
  )
}