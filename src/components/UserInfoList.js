import React, {useContext} from "react"
import {View, Text, TextInput} from "react-native"
import {List} from "../components/List"
import {parseMasterData} from "../helper/requestHelper"
import {appStore} from "../stores/appStore"

const styles = {
  listItem: {
    height: 40,
    borderBottomWidth: 0.5
  },
  selected: {
    minWidth: 70,
    textAlign: "right",
    color: "#666",
    marginRight: 10
  }
}

const UserInfoItem = ({value, type, onPress, onChange}) => {
  return (
    <View style={{justifyContent: "center"}}>
      {type === "text"
        ? <TextInput defaultValue={value} placeholder="未入力" color="#666" style={styles.selected} onChangeText={onChange} />
        : <Text style={styles.selected} onPress={onPress}>{value ? value : "未選択"}</Text>
      }
    </View>
  )
}

// displayItemsMapのフォーマット
// typeはtext, picker, date
// 
// {
//   nickname: {label: "表示名", type: "text"}, 
//   face_type: {label: "顔型", type: "picker"},
//   birthdate: {label: "生年月日", type: "date"},
// }


export const UserInfoList = ({displayItemsMap, handleTmpUser: [tmpUser, setTmpUser], handleWheelPicker=[{}, ()=>{}], handleDatePicker=[{}, ()=>{}]}) => {
  const {state: {masterData}} = useContext(appStore)

  return <List rows={Object.entries(tmpUser).reduce((accumulator, [key, value]) => {
    if(!Object.keys(displayItemsMap).includes(key)) return accumulator
    const choices = displayItemsMap[key].type === "picker" ? parseMasterData(masterData, key): []
    const [state, setState] = displayItemsMap[key].type === "picker" ? handleWheelPicker : displayItemsMap[key].type === "date" ? handleDatePicker : [{}, ()=>{}]
    accumulator.push({title: displayItemsMap[key].label, style: styles.listItem,
      // eslint-disable-next-line react/display-name
      right: () => 
        <UserInfoItem
          key={key}
          value={displayItemsMap[key].type === "picker" ? masterData[key][value] : value}
          type={displayItemsMap[key].type}
          onChange={value => setTmpUser({...tmpUser, [key]: value})}
          onPress={() => setState({...state, isShown: true, choices, key, selected: value})}
        />
    })
    return accumulator
  }, [])} />
}