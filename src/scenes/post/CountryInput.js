import React, {useContext} from "react"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {ChipList} from "../../components/ChipList"
import {postStore, updateTmpPost} from "../../stores/postStore"


const createItems = (countries, dispatch, tmpPost) =>
  countries.map(({label, key}) => ({
    label: label,
    key: key,
    selected: key === tmpPost.country,
    onPress: () => updateTmpPost(dispatch, tmpPost, {country: key})
  }))


export const CountryInput = () => {
  const {dispatch, state: {tmpPost}} = useContext(postStore)
  const {state: {masterData}} = useContext(appStore)
  const countries = parseMasterData(masterData, "country")
  const items = createItems(countries, dispatch, tmpPost)

  return <ChipList items={items} />
}