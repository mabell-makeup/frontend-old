import React, {useEffect} from "react"
import {ScrollView, StyleSheet} from "react-native"
import {Avatar, Button} from "react-native-paper"
import {useSelector} from "react-redux"
import {useDispatch} from "react-redux"
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
  const dispatch = useDispatch()
  const {user_id, blocked_users} = useSelector(({auth: {user: {user_id, blocked_users}}}) => ({user_id, blocked_users}))
  const rows = useCreateRows(blocked_users)

  useEffect(async () => {
    await fetchBlockedUsers(dispatch, user_id)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <List rows={rows} />
    </ScrollView>
  )
}