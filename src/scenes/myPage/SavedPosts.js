import {useNavigation} from "@react-navigation/core"
import React, {useEffect} from "react"
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
      await fetchPostDetail(dispatch, post.post_id, post.user_id, user_id)
      navigation.navigate("PostDetail", {refreshFunc: async () => await fetchPostDetail(dispatch, post.post_id, post.user_id, user_id)})
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
  const dispatch = useDispatch()
  const {user_id, saved_posts} = useSelector(({auth: {user: {user_id, saved_posts}}}) => ({user_id, saved_posts}))
  const data = useCreateDataWithNavigation(saved_posts)
  const loadMore = useLoadMore(saved_posts.next_token)

  useEffect(async () => {
    await fetchSavedPosts(dispatch, user_id)
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
