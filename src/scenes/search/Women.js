import React, {useContext} from "react"
import {ImageList} from "../../components/ImageList"
import {searchStore} from "../../stores/searchStore"
import {fetchPostDetail, postStore} from "../../stores/postStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"

const createDataWithNavigation = (searchResult, navigation, dispatch) => searchResult.map(post => ({
  ...post,
  onPress: () => {
    fetchPostDetail(dispatch, post.id)
    navigation.navigate("PostDetail", {id: post.id})
  }
}))

export const Women = ({navigation}) => {
  const {state: {searchResult}} = useContext(searchStore)
  const {dispatch} = useContext(postStore)

  return (
    <>
      <ImageList data={createDataWithNavigation(searchResult, navigation, dispatch)} />
      <UserInfoToggleGroup />
    </>
  )
}