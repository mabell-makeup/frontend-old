import React, {useContext} from "react"
import {postStore, updateTmpPost} from "../../stores/postStore"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {ChipList} from "../../components/ChipList"

const createItems = (makeUpCategories, dispatch, tmpPost) =>
  makeUpCategories.map(({label, key}) => ({
    label,
    key,
    // eslint-disable-next-line react/display-name
    selected: key === tmpPost.makeup_categories,
    onPress: () => updateTmpPost(dispatch, tmpPost, {makeup_categories: key})
  }))


export const MakeUpCategoryInput = () => {
  const {dispatch, state: {tmpPost}} = useContext(postStore)
  const {state: {masterData}} = useContext(appStore)
  const makeUpCategories = parseMasterData(masterData, "makeup_categories")
  const items = createItems(makeUpCategories, dispatch, tmpPost)

  return <ChipList items={items} />
}
