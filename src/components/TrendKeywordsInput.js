import React, {useContext, useEffect, useState} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "../components/ChipList"
import {apiRequest} from "../helper/requestHelper"

const getTrendKeywords = async setTrendKeywords => {
  const query = `{
    trendKeywords(limit: 10) {
        keyword
      }
  }`
  // const data = await apiRequest(query)
  // setTrendKeywords(data.trendKeywords)
}

const createRows = (keywords, onChipPress) => keywords.map(keyword => ({
  label: `#${keyword}`,
  onPress: onChipPress(keyword)
}))

export const TrendKeywordsInput = ({onChipPress=keyword=>keyword}) => {
  const [trendKeywords, setTrendKeywords] = useState([])
  useEffect(() => {
    getTrendKeywords(setTrendKeywords)
  })

  const rows = createRows(trendKeywords, onChipPress)

  return <ChipList items={rows} />
}