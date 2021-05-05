import React from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {parseMasterData} from "../../helper/requestHelper"
import {updateSearchResult, updateTmpConditions, fetchPosts} from "../../stores/searchStore"
import {useDispatch, useSelector} from "react-redux"
import {ImageList} from "../../components/ImageList"
import {fetchPostDetail} from "../../stores/postDetailStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"
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

const NewsFeedInner = ({navigation}) => {
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
        showUserInfo={true}
      />
      {/* <UserInfoToggleGroup /> */}
    </>
  )
}


const createItems = (screens, dispatch, tmpConditions) => 
  screens.map(({label, key}) => ({
    label,
    routeName: label,
    component: NewsFeedInner,
    key,
    listeners: {focus: () => changeTab(dispatch, tmpConditions, key)}
  }))

const changeTab = async (dispatch, tmpConditions, key) => {
  await updateTmpConditions(dispatch, tmpConditions, {gender: key}, false)
  await updateSearchResult(dispatch)
}

export const NewsFeed = () => {
  const dispatch = useDispatch()
  const {tmpConditions, masterData} = useSelector(({search: {tmpConditions}, app: {masterData}}) => ({tmpConditions, masterData}))
  const genders = parseMasterData(masterData, "gender")
  const items = createItems(genders, dispatch, tmpConditions)

  return <TopNavigation items={items} />
}
