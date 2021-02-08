import React, {useContext} from "react"
import {parseMasterData} from "../helper/requestHelper"
import {appStore} from "../stores/appStore"
import {searchStore, updateTmpConditions, fetchPosts} from "../stores/searchStore"
import {ChipList} from "./ChipList"


const createItems = (countries, dispatch, tmpConditions) =>
  countries.map(country => ({
    label: country.label,
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
  const {state: {masterData}} = useContext(appStore)
  const countries = parseMasterData(masterData, "country")
  const items = createItems(countries, dispatch, state.tmpConditions)

  return <ChipList items={items} />
}