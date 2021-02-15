import React, {useContext} from "react"
import {ImageList} from "../../components/ImageList"
import {searchStore} from "../../stores/searchStore"
import {fetchPostDetail, postDetailStore} from "../../stores/postDetailStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"

const createDataWithNavigation = (searchResult, navigation, dispatch) => searchResult.map(post => ({
  ...post,
  onPress: () => {
    fetchPostDetail(dispatch, post.id, post.DateTime)
    navigation.navigate("PostDetail", {id: post.id})
  }
}))

export const Women = ({navigation}) => {
  const {state: {searchResult}} = useContext(searchStore)
  const {dispatch} = useContext(postDetailStore)

  return (
    <>
      <ImageList data={createDataWithNavigation(searchResult, navigation, dispatch)} />
      <UserInfoToggleGroup />
    </>
  )
}