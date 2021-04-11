import React, {useState} from "react"
import {View, TouchableOpacity, Image, FlatList, ScrollView} from "react-native"
import {Appbar, Avatar, Text, Button, IconButton, Title} from "react-native-paper"
import {Carousel} from "../components/Carousel"
import {ChipList} from "../components/ChipList"
import {Loading} from "../components/Loading"
import {PopupMenu} from "../components/PopupMenu"
import {openReportInappropriateContentPage} from "../helper/contactHelper"
import {parseMasterData} from "../helper/requestHelper"
import {updateLikePost, fetchUserPosts} from "../stores/postDetailStore"
import {WINDOW_WIDTH, MORE_ICON} from "../styles/constants"
import {useDispatch, useSelector} from "react-redux"
import {primary} from "../styles/colors"
import {PullToRefresh} from "../components/PullToRefresh"

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
    borderColor: favorite ? primary : "#ccc"
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
  centerAlignment: {
    flexDirection: "row",
    alignItems: "center"
  },
  postTime: {
    marginTop: 30
  }
})

const menus = post_id => ([
  {title: "報告する", icon: "flag", onPress: () => openReportInappropriateContentPage(post_id)}
])

const userFetchAction = (navigation, dispatch, user_id) => async () => {
  await fetchUserPosts(dispatch, user_id)
  navigation.navigate("UserHome")
}

const PostHeader = ({postUser, navigation, setShowMenu}) => {
  const dispatch = useDispatch()
  const styles = createStyles()

  return (
    <Appbar.Header style={styles.header} theme={{colors: {primary:"#fff"}}}>
      <TouchableOpacity style={styles.headerLeft} onPress={userFetchAction(navigation, dispatch, postUser.user_id)}>
        {/* eslint-disable-next-line no-undef */}
        <Avatar.Image size={38} source={postUser.thumbnail_img_src !== "" ? {uri: postUser.thumbnail_img_src} : require("../../assets/no_image.png")} />
        <Appbar.Content 
          title={postUser.nickname}
          titleStyle={styles.name}
          subtitle={`@${postUser.name}`}
          subtitleStyle={styles.subTitle}
        />
      </TouchableOpacity>
      <Appbar.Action style={styles.moreIcon} icon={MORE_ICON} onPress={() => setShowMenu(true)} />
    </Appbar.Header>
  )
}

const displayItemsList = ["base_color", "season", "face_type", "skin_type"]

// eslint-disable-next-line complexity
const PostInfo = ({navigation}) => {
  const {post, products, isLoading, masterData} = useSelector(({postDetail: {post, products, isLoading}, app: {masterData}}) => ({post, products, isLoading, masterData}))
  const labelMap = Object.fromEntries(displayItemsList.map(key => [key, parseMasterData(masterData, key, "object")]))
  const styles = createStyles(post.isLike)

  return (
    <>
      <View style={styles.infoContainer}>
        <Text style={styles.description}>{post.description}</Text>
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
        <View style={[styles.centerAlignment, styles.postTime]}>
          <IconButton size={15} icon="clock" style={{margin: 0}} />
          <Text>{post.DateTime ? post.DateTime.replace("T", " ").slice(0, -8) : ""}</Text>
        </View>
      </View>
      <Loading isLoading={isLoading} />
    </>
  )
}

const ReactionContainer = () => {
  const styles = createStyles()
  const dispatch = useDispatch()
  const post = useSelector(({postDetail: {post}}) => post)

  return (
    <View style={styles.infoContainer}>
      <View style={styles.centerAlignment}>
        <View style={styles.centerAlignment}><IconButton icon="eye" size={15} style={{margin: 0}} color="#666" /><Text style={styles.strong}>{post.page_views ? post.page_views : 0}</Text></View>
        <View style={styles.centerAlignment}><IconButton icon="heart" size={15} style={{margin: 0}} color="#666" /><Text style={styles.strong}>{post.like_count ? post.like_count : 0}</Text></View>
      </View>
      <View style={styles.buttonContainer}>
        <IconButton icon={post.isLike ? "heart" : "heart-outline"} style={[styles.button, styles.favoriteButton]} color={post.isLike ? primary : "#999"} onPress={() => updateLikePost(dispatch, post.isLike, post.post_id)} />
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
  const products = useSelector(({postDetail: {products}}) => products)

  return (
    <FlatList
      data={products}
      renderProduct={({product}) => <Product product={product} navigation={navigation} />}
      keyExtractor={product => product.id}
      numColumns={3}
    />
  )
}

export const PostDetail = ({navigation, route: {params: {refreshFunc}}}) => {
  const {post, postUser} = useSelector(({postDetail: {post, postUser}}) => ({post, postUser}))
  const [showMenu, setShowMenu] = useState(false)

  return (
    <>
      <ScrollView refreshControl={<PullToRefresh refreshFunc={refreshFunc} />}>
        <PostHeader postUser={postUser} navigation={navigation} setShowMenu={setShowMenu} />
        <Carousel data={post.img_src_list} />
        <ReactionContainer />
        {/* <ProductInfo navigation={navigation} /> */}
        <PostInfo navigation={navigation} />
        {/* <FollowLink postUser={postUser} navigation={navigation} /> */}
      </ScrollView>
      <PopupMenu menus={menus(post.post_id)} handleShown={[showMenu, setShowMenu]} />
    </>
  )
}
