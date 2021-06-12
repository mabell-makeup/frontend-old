import React, {useState} from "react"
import {Menu} from "react-native-paper"
import {IconLabel} from "./IconLabel"

export const DropDownMenu = ({icon="", size=20, style={}, items=[{label:"", key:"", onPress:()=>{}, selected: false}], children}) => {
  const [visible, setVisible] = useState(false)
  const onPressWithClose = onPressFunc => () => {
    setVisible(false)
    onPressFunc()
  }

  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      style={style}
      anchor={<IconLabel icon={icon} size={size} onPress={() => setVisible(true)}>{children}</IconLabel>}
    >
      {items.map(item => <Menu.Item key={item.key} title={item.label} onPress={onPressWithClose(item.onPress)} style={item.selected ? {backgroundColor: "#aaa"} : {}} />)}
    </Menu>
  )
}
