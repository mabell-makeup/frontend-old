import React, {useContext, useEffect} from "react"
import {TopNavigation} from "../../components/TopNavigation"
import {fetchPosts, searchStore, updateSearchResult} from "../../stores/searchStore"
import {Men} from "./Men"
import {Women} from "./Women"

const items = [
  {label: "Women", routeName: "Women", component: Women},
  {label: "Men", routeName: "Men", component: Men}
]

const fetchTrendPosts = dispatch => {
  fetchPosts(dispatch, {order: "DESC"})
  updateSearchResult(dispatch)
}

export const NewsFeed = () => {
  const {dispatch, state: {searchResult}} = useContext(searchStore)
  
  useEffect(() => {if (searchResult.length === 0) fetchTrendPosts(dispatch)}, [])

  return <TopNavigation items={items} />
}
