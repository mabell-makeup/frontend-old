import React, {useState, useContext} from "react"
import {FAB, Portal, Provider} from "react-native-paper"
import {searchStore, updateTmpConditions} from "../stores/searchStore"


const actions = (handlePressAction, {personalColor, faceType}) => ([
  {
    icon: "palette",
    label: "パーソナルカラーで絞り込む",
    onPress: handlePressAction("personalColor", {personalColor: !personalColor}),
    style: {backgroundColor: personalColor ? "#FFF" : "#888"}
  },
  {
    icon: "face",
    label: "顔タイプで絞り込む",
    onPress: handlePressAction("faceType", {faceType: !faceType}),
    style: {backgroundColor: faceType ? "#FFF" : "#888"}
  }
])

// TODO: 適当に直したので後で再修正すること
export const UserInfoToggleGroup = () => {
  const [open, setOpen] = useState(false)
  const {dispatch, state: {tmpConditions}} = useContext(searchStore)
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