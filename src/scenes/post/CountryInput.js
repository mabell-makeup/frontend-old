import React from "react"
import {parseMasterData} from "../../helper/requestHelper"
import {ChipList} from "../../components/ChipList"
import {updateTmpPost} from "../../stores/postStore"
import {useDispatch, useSelector} from "react-redux"


const createItems = (countries, dispatch, tmpPost) =>
  countries.map(({label, key}) => ({
    label: label,
    key: key,
    selected: key === tmpPost.country,
    onPress: () => updateTmpPost(dispatch, tmpPost, {country: key})
  }))


export const CountryInput = () => {
  const dispatch = useDispatch()
  const {tmpPost, masterData} = useSelector(({post: {tmpPost}, app: {masterData}}) => ({tmpPost, masterData}))
  const countries = parseMasterData(masterData, "country")
  const items = createItems(countries, dispatch, tmpPost)

  return <ChipList items={items} />
}