import React from "react"
import {FAB, Portal, Provider} from "react-native-paper"


const actions = [
  {
    icon: "bell",
    label: "Remind",
    onPress: () => console.log("Pressed notifications")
  },
  {
    icon: "bell",
    label: "Remind",
    onPress: () => console.log("Pressed notifications")
  },
  {
    icon: "bell",
    label: "Remind",
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
          icon={open ? "calendar-today" : "plus"}
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