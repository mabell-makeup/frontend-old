import React, {useState} from "react"
import {View, Text, StyleSheet, ScrollView, KeyboardAvoidingView} from "react-native"
import {Avatar, Divider, IconButton} from "react-native-paper"
import {useSelector} from "react-redux"
import {IconTextInput} from "../components/IconTextInput"

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  row: {
    flexDirection: "row"
  },
  divider: {
    marginVertical: 5
  },
  nickname: {
    fontWeight: "bold",
    color: "#333",
    marginTop: 3,
    marginLeft: 5
  },
  comment: {
    marginLeft: 35
  },
  input: {
    height: 40,
    width: "80%",
    position: "absolute",
    bottom: 10,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center"
  }
})


const CommentItem = ({thumbnail_img_src, nickname, comment}) => {
  return (
    <>
      <View style={styles.itemContainer}>
        <View style={styles.row}>
          {/* eslint-disable-next-line no-undef */}
          <Avatar.Image size={30} source={thumbnail_img_src !== "" ? {uri: thumbnail_img_src} : require("../../assets/no_image.png")} onPress={() => {}} />
          <Text style={styles.nickname}>{nickname}</Text>
        </View>
        <Text style={styles.comment}>{comment}</Text>
      </View>
      <Divider style={styles.divider} />
    </>
  )
}

/* APIができるまでのモックデータ ここから*/
const mabell_thumbnail = "https://mabell-app-img-storage.s3-ap-northeast-1.amazonaws.com/ap-northeast-1:b90cae25-45c8-4361-91b7-47a5fa2474ab/a0a6e6e1-e195-4ae4-a817-1e01a2019857.png"

const testCommentsData = ({user_id, thumbnail_img_src, nickname}) => ([
  {user_id, thumbnail_img_src, nickname, comment: "コメント1", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "これはとっても長いコメントのサンプルです。ほら長いでしょ？", updated_at: "", to: ""},
  {user_id, thumbnail_img_src, nickname, comment: "フォローさせていただきました♪コスメかわいい💖欲しいです☺️💓よかったら仲良くしてください🥰", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "@test_sunagawa さま🌸コメント、フォローありがとうございます🙇🏻‍♀️嬉しいです！！ぜひよろしくお願いします🐒💖", updated_at: "", to: ""},
  {user_id, thumbnail_img_src, nickname, comment: "コメント5", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "コメント6", updated_at: "", to: ""}
])
/* APIができるまでのモックデータ ここまで*/

export const Comments = () => {
  const {user_id, thumbnail_img_src, nickname} = useSelector(({auth: {user}}) => user)
  // const {post} = useSelector(({postDetail: {post}}) => ({post}))
  const [comments, setComments] = useState(testCommentsData({user_id, thumbnail_img_src, nickname}))
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  return (
    <>
      <ScrollView>
        {comments.map((comment, idx) => <CommentItem key={`comment_${idx}`} {...comment} />)}
      </ScrollView>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={180}
        enabled={isFocused}
      >
        <View style={styles.input}>
          <IconTextInput onChangeText={text => setInput(text)} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} icon="" />
          <IconButton icon="send" color="#333" onPress={() => setComments([...comments, {
            user_id,
            thumbnail_img_src,
            nickname,
            comment: input
          }])} />
        </View>
      </KeyboardAvoidingView>
    </>
  )
}
