import React from "react"
import {parseMasterData} from "../helper/requestHelper"
import {ChipList} from "./ChipList"
import {useSelector} from "react-redux"


const createItems = (countries, tmpState, onPress) =>
  countries.map(({label, key}) => ({
    label: label,
    key: key,
    selected: key === tmpState.country,
    onPress: onPress(key)
  }))


export const CountryInput = ({tmpState={}, onPress=country=>country}) => {
  const {masterData} = useSelector(({post: {tmpState}, app: {masterData}}) => ({tmpState, masterData}))
  const countries = parseMasterData(masterData, "country")
  const items = createItems(countries, tmpState, onPress)

  return <ChipList items={items} />
}