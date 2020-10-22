import React from "react"
import {FAB, Portal, Provider} from "react-native-paper"


const actions = [
  {
    icon: "palette",
    label: "パーソナルカラーで絞り込む",
    onPress: () => console.log("Pressed notifications")
  },
  {
    icon: "face",
    label: "顔タイプで絞り込む",
    onPress: () => console.log("Pressed notifications")
  }
]


export const UserInfoToggleGroup = () => {
  const [state, setState] = React.useState({open: false})
  const onStateChange = ({open}) => setState({open})
  const {open} = state

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? "close" : "account-search"}
          actions={actions}
          onStateChange={onStateChange}
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