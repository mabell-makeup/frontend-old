import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "../components/ChipList"
import {apiRequest} from "../helper/requestHelper"

const getTrendKeywords = () => {
  const query = `{
    trendKeywords(limit: 10) {
        keyword
      }
  }`
  const {data, error, loading} = apiRequest(query)
  return !loading && !error ? data.trendKeywords : []
}

const createRows = (dispatch, keywords, tmpConditions, navigation) =>
  keywords.map(keyword => ({
    label: `#${keyword}`,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {keywords: keyword})
      fetchPosts(dispatch, tmpConditions)
      navigation.navigate("SelectKeywords")
    }
  }))

export const TrendKeywordsInput = ({navigation}) => {
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
  const trendKeywords = getTrendKeywords()
  const rows = createRows(dispatch, trendKeywords, tmpConditions, navigation)

  return <ChipList items={rows} />
}