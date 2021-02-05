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

const createRows = (keywords, onChipPress) => keywords.map(keyword => ({
  label: `#${keyword}`,
  onPress: onChipPress(keyword)
}))

export const TrendKeywordsInput = ({onChipPress=keyword=>keyword}) => {
  const trendKeywords = getTrendKeywords()
  const rows = createRows(trendKeywords, onChipPress)

  return <ChipList items={rows} />
}