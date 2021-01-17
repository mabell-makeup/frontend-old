import React, {useContext} from "react"
import {ImageList} from "../../components/ImageList"
import {fetchPostDetail, searchStore} from "../../stores/searchStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"

const createDataWithNavigation = (searchResult, navigation, dispatch) => searchResult.map(post => ({
  ...post,
  onPress: () => {
    fetchPostDetail(dispatch, post.id)
    navigation.navigate("Post", {id: post.id})
  }
}))

export const Women = ({navigation}) => {
  const {dispatch, state: {searchResult}} = useContext(searchStore)

  return (
    <>
      <ImageList data={createDataWithNavigation(searchResult, navigation, dispatch)} />
      <UserInfoToggleGroup />
    </>
  )
}