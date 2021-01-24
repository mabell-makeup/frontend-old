import React, {useContext} from "react"
import {View, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
import {Title} from "react-native-paper"
import {Appbar, Avatar, Text} from "react-native-paper"
import {Platform} from "react-native"
import {searchStore} from "../../stores/searchStore"
import {Carousel} from "../../components/Carousel"
import {ChipList} from "../../components/ChipList"

// TODO: Constantsに移動
const MORE_ICON = Platform.OS === "ios" ? "dots-horizontal" : "dots-vertical"

const styles = StyleSheet.create({
  userName: {
    color: "#000"
  },
  moreIcon: {
    position: "absolute",
    right: 0
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row"
  },
  infoContainer: {
    marginTop: 10,
    paddingHorizontal: 10
  },
  description: {
    marginVertical: 20,
    lineHeight: 30
  },
  strong: {
    fontWeight: "bold"
  }
})

const PostHeader = ({userName, userId, userThumbnail, navigation}) => {
  return (
    <Appbar.Header>
      <TouchableOpacity style={styles.headerLeft} onPress={() => navigation.navigate("UserHome")}>
        <Avatar.Image size={38} source={{uri: userThumbnail}} />
        <Appbar.Content 
          title={userName}
          titleStyle={styles.userName}
          subtitle={"Subtitle"}
          subtitleStyle={styles.userName}
        />
      </TouchableOpacity>
      <Appbar.Action style={styles.moreIcon} icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  )
}

const PostInfo = ({post}) => {
  return (
    <View style={styles.infoContainer}>
      <Text>いいね！ <Text style={styles.strong}>{post.page_views}</Text>件</Text>
      <Text style={styles.description}>{post.description}</Text>
      <View>
        <Title>タグ</Title>
        <ChipList items={post.tags.map(tags => ({label: tags}))} />
      </View>
    </View>
  )
}

export const PostDetail = ({navigation}) => {
  const {state: {post}} = useContext(searchStore)

  return (
    <ScrollView>
      <PostHeader userName={post.user_name} userId={post.user_id} userThumbnail={post.user_thumbnail_img_src} navigation={navigation} />
      <Carousel data={post.img_src_list} />
      <PostInfo post={post} />
    </ScrollView>
  )
}
