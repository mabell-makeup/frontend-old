import React, {useEffect, useState} from "react"
import {ScrollView, StyleSheet} from "react-native"
import {Avatar, Button} from "react-native-paper"
import {List} from "../../components/List"
import {fetchBlockedUsers} from "../../stores/authStore"


const styles = StyleSheet.create({
  container: {
    marginTop: 5
  },
  thumbnail: {
    marginLeft: 10
  },
  button: {
    marginRight: 10
  },
  row: {
    height: 50,
    borderBottomWidth: 0.5,
    borderColor: "#ccc"
  }
})


const useCreateRows = blockedUsers =>
  blockedUsers.map(({thumbnail_img, user_id, name}) => ({
    title: name,
    key: user_id,
    // eslint-disable-next-line react/display-name
    left: () => <Avatar.Image size={38} source={thumbnail_img !== "" ? {uri: thumbnail_img} : require("../../../assets/no_image.png")} style={styles.thumbnail} />,
    // eslint-disable-next-line react/display-name
    right: () => <Button onPress={() => {}} style={styles.button}>解除する</Button>,
    style: styles.row
  }))

export const BlockedUsers = () => {
  const [blockedUsers, setBlockedUsers] = useState([{
    user_id: "1234",
    thumbnail_img: "",
    name: "テストユーザー"
  }])
  const rows = useCreateRows(blockedUsers)

  useEffect(async () => {
    // const posts = await fetchBlockedUsers()
    setBlockedUsers(blockedUsers)
  }, [])
  

  return (
    <ScrollView style={styles.container}>
      <List rows={rows} />
    </ScrollView>
  )
}