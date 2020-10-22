import React, {useState, useContext} from "react"
import {FAB, Portal, Provider} from "react-native-paper"
import {searchStore, updateConditionsUserInfo} from "../stores/searchStore"


const actions = (handlePressAction, {personalColor, faceType}) => ([
  {
    icon: "palette",
    label: "パーソナルカラーで絞り込む",
    onPress: handlePressAction({personalColor: !personalColor})
  },
  {
    icon: "face",
    label: "顔タイプで絞り込む",
    onPress: handlePressAction({faceType: !faceType})
  }
])


export const UserInfoToggleGroup = () => {
  const [open, setOpen] = useState(false)
  const {dispatch, state: {conditions: {userInfo}}} = useContext(searchStore)
  const handleDial = ({open}) => setOpen(open)
  const handlePressAction = userInfo => () => updateConditionsUserInfo(dispatch, userInfo)

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "close" : "account-search"}
          actions={actions(handlePressAction, userInfo)}
          onStateChange={handleDial}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
  )
}