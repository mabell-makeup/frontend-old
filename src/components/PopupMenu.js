import React from "react"
import {StyleSheet, View} from "react-native"
import {Menu} from "react-native-paper"
import {WINDOW_WIDTH} from "../styles/constants"
import {Overlay} from "./Overlay"

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ddd",
    borderRadius: 18,
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0
  },
  item: {
    width: "100%",
    height: 40
  },
  close: {
    width: "100%",
    height: 40,
    borderRadius: 18,
    alignItems: "center",
    backgroundColor: "#ddd",
    maxWidth: WINDOW_WIDTH,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  closeLabel: {
    textAlign: "center"
  }
})


export const PopupMenu = ({handleShown=[false, ()=>{}], menus=[{title: "", onPress: ()=>{}}]}) => {
  const [isShown, setIsShown] = handleShown
  const onPressMenu = (onPressAction) => () => {
    onPressAction()
    setIsShown(false)
  }

  return isShown &&
    <Overlay>
      <View style={styles.container}>
        {menus.map((menu, idx) => <Menu.Item style={styles.item} key={idx} title={menu.title} icon={menu.icon} onPress={onPressMenu(menu.onPress)} />)}
      </View>
      <Menu.Item style={styles.close} titleStyle={styles.closeLabel} title="閉じる" onPress={() => setIsShown(false)} />
    </Overlay>
}
