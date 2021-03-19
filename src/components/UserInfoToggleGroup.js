import React, {useState} from "react"
import {FAB, Portal, Provider} from "react-native-paper"
import {updateTmpConditions} from "../stores/searchStore"
import {useDispatch, useSelector} from "react-redux"


const actions = (handlePressAction, {personalColor, faceType}) => ([
  {
    icon: "palette",
    label: "パーソナルカラーで絞り込む",
    onPress: handlePressAction("personalColor", {personalColor: !personalColor}),
    style: {backgroundColor: personalColor ? "#FFF" : "#888"}
  },
  {
    icon: "face",
    label: "顔型で絞り込む",
    onPress: handlePressAction("faceType", {faceType: !faceType}),
    style: {backgroundColor: faceType ? "#FFF" : "#888"}
  }
])

// TODO: 適当に直したので後で再修正すること
export const UserInfoToggleGroup = () => {
  const [open, setOpen] = useState(false)
  const dispatch = useDispatch()
  const tmpConditions = useSelector(({search: {tmpConditions}}) => tmpConditions)
  const handleDial = () => setOpen(!open)
  const handlePressAction = (target, {personalColor, faceType}) => () => {
    target === "personalColor"
      ? updateTmpConditions(dispatch, tmpConditions, {personalColor})
      : target === "faceType"
        ? updateTmpConditions(dispatch, tmpConditions, {faceType})
        : false
  }

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "close" : "account-search"}
          actions={actions(handlePressAction, tmpConditions)}
          onStateChange={() => {}}
          onPress={handleDial}
        />
      </Portal>
    </Provider>
  )
}