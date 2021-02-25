import React, {useContext} from "react"
import {View, ScrollView, TouchableOpacity, Image, FlatList} from "react-native"
import {Appbar, Avatar, Text, Button, IconButton, Title} from "react-native-paper"
import {Carousel} from "../../components/Carousel"
import {ChipList} from "../../components/ChipList"
import {parseMasterData} from "../../helper/requestHelper"
import {appStore} from "../../stores/appStore"
import {updateLikePost, postDetailStore, fetchUserPosts} from "../../stores/postDetailStore"
import {WINDOW_WIDTH, MORE_ICON} from "../../styles/constants"

// eslint-disable-next-line max-lines-per-function
const createStyles = favorite => ({
  header: {
    height: 45
  },
  name: {
    color: "#000",
    fontSize: 14
  },
  subTitle: {
    color: "#000"
  },
  moreIcon: {
    position: "absolute",
    right: 0
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignProducts: "center"
  },
  infoContainer: {
    marginTop: 6,
    padding: 10
  },
  description: {
    marginTop: 10,
    lineHeight: 30
  },
  createdAt: {
    alignProducts: "center",
    flexDirection: "row",
    marginTop: 20
  },
  strong: {
    fontWeight: "bold"
  },
  followLink: {
    flexDirection: "row",
    alignProducts: "center"
  },
  marginLeft: {
    marginLeft: 10
  },
  followLinkNickname: {
    marginBottom: 2,
    fontSize: 16
  },
  followLinkName: {
    color: "#999"
  },
  followLinkButton: {
    marginLeft: "auto"
  },
  button: {
    borderWidth: 1,
    paddingTop: 2,
    marginLeft: 0,
    borderColor: "#ccc"
  },
  favoriteButton: {
    borderColor: favorite ? "#FF7F50" : "#ccc"
  },
  buttonContainer: {
    flexDirection: "row"
  },
  tag: {
    marginTop: 20
  },
  tagTitle: {
    marginTop: 20
  },
  products: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "#999"
  },
  product: {
    width: (WINDOW_WIDTH-6) / 3,
    margin: 1
  },
  productImage: {
    width: (WINDOW_WIDTH-6) / 3,
    height: (WINDOW_WIDTH-6) / 3
  },
  brandName: {
    fontWeight: "bold"
  },
  count: {
    flexDirection: "row"
  }
})

const userFetchAction = (navigation, dispatch, user_id) => async () => {
  await fetchUserPosts(dispatch, user_id)
  navigation.navigate("UserHome")
}

const PostHeader = ({postUser, navigation}) => {
  const {dispatch} = useContext(postDetailStore)
  const styles = createStyles()

  return (
    <Appbar.Header style={styles.header} theme={{colors: {primary:"#fff"}}}>
      <TouchableOpacity style={styles.headerLeft} onPress={userFetchAction(navigation, dispatch, postUser.user_id)}>
        {/* eslint-disable-next-line no-undef */}
        <Avatar.Image size={38} source={postUser.thumbnail_img_src !== "" ? {uri: postUser.thumbnail_img_src} : require("../../../assets/no_image.png")} />
        <Appbar.Content 
          title={postUser.nickname}
          titleStyle={styles.name}
          subtitle={`@${postUser.name}`}
          subtitleStyle={styles.subTitle}
        />
      </TouchableOpacity>
      <Appbar.Action style={styles.moreIcon} icon={MORE_ICON} onPress={() => {}} />
    </Appbar.Header>
  )
}

const displayItemsList = ["base_color", "season", "face_type", "skin_type"]

// eslint-disable-next-line complexity
const PostInfo = ({navigation}) => {
  const {state: {post, products}} = useContext(postDetailStore)
  const {state: {masterData}} = useContext(appStore)
  const labelMap = Object.fromEntries(displayItemsList.map(key => [key, parseMasterData(masterData, key, "object")]))
  const styles = createStyles(post.isLike)

  return (
    <View style={styles.infoContainer}>
      <Text style={styles.description}>{post.description}</Text>
      <View style={styles.createdAt}>
        <IconButton size={15} icon="clock" style={{margin: 0}} />
        <Text>{post.DateTime ? post.DateTime.replace("T", " ").slice(0, -8) : ""}</Text>
      </View>
      <View style={styles.tag}>
        <Title style={styles.tagTitle}>ユーザー情報</Title>
        {Object.entries(post).filter(([key, value]) => displayItemsList.includes(key) && value).length > 0 ? <ChipList items={Object.entries(post).filter(([key]) => displayItemsList.includes(key)).map(([key, value]) => ({label: labelMap[key][value], onPress: () => {}}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
        <Title style={styles.tagTitle}>アイテム</Title>
        {products.length > 0 ? <ChipList items={products.map(product => ({label: product.product_name, onPress: () => navigation.navigate("ProductDetail")}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
        <Title style={styles.tagTitle}>ブランド</Title>
        {products.length > 0 ? <ChipList items={products.map(product => ({label: product.brand_name}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
        <Title style={styles.tagTitle}>タグ</Title>
        {post.tags.length > 0 ? <ChipList items={post.tags.map(tag => ({label: "#" + tag}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
      </View>
    </View>
  )
}

const ReactionContainer = () => {
  const styles = createStyles()
  const {dispatch, state: {post}} = useContext(postDetailStore)

  return (
    <View style={styles.infoContainer}>
      <View style={styles.count}>
        <Text>閲覧数 <Text style={styles.strong}>{post.page_views ? post.page_views : 0}</Text>件</Text>
        <Text style={styles.marginLeft}>いいね <Text style={styles.strong}>{post.like_count ? post.like_count : 0}</Text>件</Text>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton icon={post.isLike ? "heart" : "heart-outline"} style={[styles.button, styles.favoriteButton]} color={post.isLike ? "#FF7F50" : "#999"} onPress={() => updateLikePost(dispatch, post.isLike, post.post_id)} />
        {/* <IconButton icon="comment-outline" style={styles.button} color="#999" /> */}
      </View>
    </View>
  )
}


const FollowLink = ({postUser, navigation}) => {
  const styles = createStyles()

  return (
    <View style={{...styles.infoContainer, ...styles.followLink}}>
      <TouchableOpacity onPress={() => navigation.navigate("UserHome")}>
        <Avatar.Image size={50} source={{uri: postUser.thumbnail}} />
      </TouchableOpacity>
      <View style={styles.marginLeft}>
        <Text style={styles.followLinkNickname}>{postUser.nickname}</Text>
        <Text style={styles.followLinkName}>@{postUser.name}</Text>
      </View>
      <Button mode="outlined" style={styles.followLinkButton}>フォローする</Button>
    </View>
  )
}

const Product = ({product, navigation}) => {
  const styles = createStyles()

  return (
    <TouchableOpacity onPress={() => navigation.navigate("ProductDetail")}>
      <View key={product.id} style={styles.product}>
        <Image source={{uri: product.img_src}} style={styles.productImage} />
        <Text style={styles.brandName} numberOfLines={1}>{product.brand_name}</Text>
        <Text numberOfLines={1}>{product.product_name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const ProductInfo = ({navigation}) => {
  const {state: {products}} = useContext(postDetailStore)

  return (
    <FlatList
      data={products}
      renderProduct={({product}) => <Product product={product} navigation={navigation} />}
      keyExtractor={product => product.id}
      numColumns={3}
    />
  )
}

export const PostDetail = ({navigation}) => {
  const {state: {post, postUser}} = useContext(postDetailStore)
  const styles = createStyles()

  return (
    <ScrollView style={styles.container}>
      <PostHeader postUser={postUser} navigation={navigation} />
      <Carousel data={post.img_src_list} />
      <ReactionContainer />
      {/* <ProductInfo navigation={navigation} /> */}
      <PostInfo navigation={navigation} />
      {/* <FollowLink postUser={postUser} navigation={navigation} /> */}
    </ScrollView>
  )
}