import React, {useContext} from "react"
import {ImageList} from "../../components/ImageList"
import {searchStore} from "../../stores/searchStore"
import {authStore} from "../../stores/authStore"
import {fetchPostDetail, postDetailStore} from "../../stores/postDetailStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"

const createDataWithNavigation = (searchResult, navigation, dispatch, user_id) => searchResult.map(post => ({
  ...post,
  onPress: () => {
    fetchPostDetail(dispatch, post.id, post.DateTime, user_id)
    navigation.navigate("PostDetail", {id: post.id})
  }
}))

export const Women = ({navigation}) => {
  const {state: {searchResult}} = useContext(searchStore)
  const {state: {user: {user_id}}} = useContext(authStore)
  const {dispatch} = useContext(postDetailStore)

  return (
    <>
      <ImageList data={createDataWithNavigation(searchResult, navigation, dispatch, user_id)} />
      {/* <UserInfoToggleGroup /> */}
    </>
  )
}