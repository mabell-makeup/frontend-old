import React, {useContext} from "react"
import {List} from "./List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateTmpConditionsCountry, fetchPosts} from "../stores/searchStore"

const countries = [
  {title: "韓国", key: "korea"},
  {title: "中国",  key: "china"},
  {title: "欧米",  key: "america"},
  {title: "その他", key: "other"}
]

const createRows = (countries, dispatch, tmpConditions) =>
  countries.map(country => ({
    title: country.title,
    key: country.key,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={country.key === tmpConditions.country ? "checked" : "unchecked"} color="#333" />,
    onPress: () => {
      updateTmpConditionsCountry(dispatch, country.key)
      fetchPosts(dispatch, tmpConditions)
    }
  }))


export const CountryInput = () => {
  const {dispatch, state} = useContext(searchStore)
  const rows = createRows(countries, dispatch, state.tmpConditions)

  return <List rows={rows} />
}