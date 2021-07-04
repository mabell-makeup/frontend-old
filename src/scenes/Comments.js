import React, {useState} from "react"
import {View, Text, StyleSheet, ScrollView} from "react-native"
import {Avatar, Divider} from "react-native-paper"

const styles = StyleSheet.create({
  row: {
    flexDirection: "row"
  }
})


const CommentItem = ({thumbnail_img_src, nickname, comment}) => {
  return (
    <View style={styles.row}>
      {/* eslint-disable-next-line no-undef */}
      <Avatar.Image size={30} source={thumbnail_img_src !== "" ? {uri: thumbnail_img_src} : require("../../assets/no_image.png")} onPress={() => {}} />
      <Text>{nickname}</Text>
      <Text>{comment}</Text>
      <Divider style={{marginTop: 10}} />
    </View>
  )
}

/* APIができるまでのモックデータ ここから*/
const sunagawa_thumbnail = "https://mabell-app-img-storage.s3-ap-northeast-1.amazonaws.com/ap-northeast-1:1f56c1d9-8f0f-4f51-90ef-5d5f75af0b34/9fc77ca9-01a5-4d33-84ea-be273f5d84fb.jpg"
const mabell_thumbnail = "https://mabell-app-img-storage.s3-ap-northeast-1.amazonaws.com/ap-northeast-1:b90cae25-45c8-4361-91b7-47a5fa2474ab/a0a6e6e1-e195-4ae4-a817-1e01a2019857.png"

const testCommentsData = [
  {user_id: "28105991-d557-4a15-ba0d-6a6675168b28", thumbnail_img_src: sunagawa_thumbnail, nickname: "test_sunagawa", comment: "コメント1", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "これはとっても長いコメントのサンプルです。ほら長いでしょ？", updated_at: "", to: ""},
  {user_id: "28105991-d557-4a15-ba0d-6a6675168b28", thumbnail_img_src: sunagawa_thumbnail, nickname: "test_sunagawa", comment: "コメント3", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "コメント4", updated_at: "", to: ""},
  {user_id: "28105991-d557-4a15-ba0d-6a6675168b28", thumbnail_img_src: sunagawa_thumbnail, nickname: "test_sunagawa", comment: "コメント5", updated_at: "", to: ""},
  {user_id: "671419a5-983e-4b0f-a888-cd69fb02fe4f", thumbnail_img_src: mabell_thumbnail, nickname: "mabell_official", comment: "コメント6", updated_at: "", to: ""}
]
/* APIができるまでのモックデータ ここまで*/

export const Comments = () => {
  // const {post} = useSelector(({postDetail: {post}}) => ({post}))
  const [comments, setComments] = useState(testCommentsData)

  return (
    <ScrollView>
      <Text>コメント</Text>
      {comments.map((comment, idx) => <CommentItem key={`comment_${idx}`} {...comment} />)}
    </ScrollView>
  )
}
