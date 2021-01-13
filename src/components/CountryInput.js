import React, {useContext} from "react"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"

const countries = [
  {title: "韓国", key: "korea"},
  {title: "中国",  key: "china"},
  {title: "欧米",  key: "america"},
  {title: "その他", key: "other"}
]

const createItems = (countries, dispatch, tmpConditions) =>
  countries.map(country => ({
    label: country.title,
    key: country.key,
    // eslint-disable-next-line react/display-name
    selected: country.key === tmpConditions.country,
    onPress: () => {
      updateTmpConditions(dispatch, tmpConditions, {country: country.key})
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const CountryInput = () => {
  const {dispatch, state} = useContext(searchStore)
  const items = createItems(countries, dispatch, state.tmpConditions)

  return <ChipList items={items} />
}