import React, {useContext} from "react"
import {ImageList} from "../../components/ImageList"
import {searchStore} from "../../stores/searchStore"
import {UserInfoToggleGroup} from "../../components/UserInfoToggleGroup"

const createDataWithNavigation = (searchResult, navigation) => searchResult.map(post => ({
  ...post,
  onPress: () => navigation.navigate("Post", {id: post.id})
}))

export const Women = ({navigation}) => {
  const {state: {searchResult}} = useContext(searchStore)

  return (
    <>
      <ImageList data={createDataWithNavigation(searchResult, navigation)} />
      <UserInfoToggleGroup />
    </>
  )
}