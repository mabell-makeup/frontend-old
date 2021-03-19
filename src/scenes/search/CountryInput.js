import React from "react"
import {parseMasterData} from "../../helper/requestHelper"
import {updateTmpConditions} from "../../stores/searchStore"
import {ChipList} from "../../components/ChipList"
import {useDispatch, useSelector} from "react-redux"


const createItems = (countries, dispatch, tmpConditions) =>
  countries.map(country => ({
    label: country.label,
    key: country.key,
    selected: country.key === tmpConditions.country,
    onPress: () => updateTmpConditions(dispatch, tmpConditions, {country: country.key})
  }))


export const CountryInput = () => {
  const dispatch = useDispatch()
  const {search: state, masterData} = useSelector(({search, app: {masterData}}) => ({search, masterData}))
  const countries = parseMasterData(masterData, "country")
  const items = createItems(countries, dispatch, state.tmpConditions)

  return <ChipList items={items} />
}