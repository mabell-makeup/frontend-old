import {useNavigation} from "@react-navigation/core"
import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux"
import {ImageList} from "../../components/ImageList"
import {PullToRefresh} from "../../components/PullToRefresh"
import {fetchSavedPosts} from "../../stores/authStore"
import {fetchPostDetail} from "../../stores/postDetailStore"


const useCreateDataWithNavigation = savedPosts => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const user_id = useSelector(({auth: {user: {user_id}}}) => user_id)
  return savedPosts.list.map(post => ({
    ...post,
    onPress: async () => {
      await fetchPostDetail(dispatch, post.id, post.user_id, user_id)
      navigation.navigate("PostDetail", {refreshFunc: async () => await fetchPostDetail(dispatch, post.id, post.user_id, user_id)})
    }
  }))
}

const useLoadMore = nextToken => async () => {
  const dispatch = useDispatch()
  const user_id = useSelector(({auth: {user: {user_id}}}) => user_id)
  if (nextToken !== "") {
    await fetchSavedPosts(dispatch, user_id, nextToken)
  }
}


// eslint-disable-next-line max-lines-per-function
export const SavedPosts = () => {
  const [savedPosts, setSavedPosts] = useState({list: [{
    "DateTime": undefined,
    "id": "dd3504b4-6e8d-47e2-aab1-573a0c9d6149",
    "imgSrc": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA"
  }], nextToken: ""})
  const data = useCreateDataWithNavigation(savedPosts)
  const loadMore = useLoadMore(savedPosts.nextToken)

  useEffect(async () => {
    // const posts = await fetchSavedPosts()
    setSavedPosts(savedPosts)
  }, [])
  

  return (
    <ImageList
      data={data}
      onEndReached={loadMore}
      refreshControl={<PullToRefresh refreshFunc={loadMore} />}
      showUserInfo={true}
    />
  )
}
