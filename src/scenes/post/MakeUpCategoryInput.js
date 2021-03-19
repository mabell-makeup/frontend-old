import React from "react"
import {updateTmpPost} from "../../stores/postStore"
import {parseMasterData} from "../../helper/requestHelper"
import {ChipList} from "../../components/ChipList"
import {useDispatch, useSelector} from "react-redux"

const createItems = (makeUpCategories, dispatch, tmpPost) =>
  makeUpCategories.map(({label, key}) => ({
    label,
    key,
    // eslint-disable-next-line react/display-name
    selected: key === tmpPost.makeup_categories,
    onPress: () => updateTmpPost(dispatch, tmpPost, {makeup_categories: key})
  }))


export const MakeUpCategoryInput = () => {
  const dispatch = useDispatch()
  const {tmpPost, masterData} = useSelector(({post: {tmpPost}, app: {masterData}}) => ({tmpPost, masterData}))
  const makeUpCategories = parseMasterData(masterData, "makeup_categories")
  const items = createItems(makeUpCategories, dispatch, tmpPost)

  return <ChipList items={items} />
}
