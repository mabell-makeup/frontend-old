import React, {useState, useEffect} from "react"
import {View, TouchableOpacity, Image, FlatList, ScrollView} from "react-native"
import {Appbar, Avatar, Text, Button, IconButton, Title} from "react-native-paper"
import {Carousel} from "../components/Carousel"
import {ChipList} from "../components/ChipList"
import {Loading} from "../components/Loading"
import {PopupMenu} from "../components/PopupMenu"
import {openReportInappropriateContentPage} from "../helper/contactHelper"
import {parseMasterData} from "../helper/requestHelper"
import {updateLikePost, fetchUserPosts, updateSavedPost} from "../stores/postDetailStore"
import {WINDOW_WIDTH, MORE_ICON} from "../styles/constants"
import {useDispatch, useSelector} from "react-redux"
import {primary} from "../styles/colors"
import {PullToRefresh} from "../components/PullToRefresh"
import {TextWithReadMore} from "../components/TextWithReadMore"
import {IconLabel} from "../components/IconLabel"
import {deletePost} from "../stores/authStore"
import {ShareButton} from "../components/ShareButton"

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
    marginTop: 10
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
  savedButton: {
    marginLeft: "auto"
  },
  leftButtons: {
    borderColor: favorite ? primary : "#ccc",
    borderWidth: 1,
    paddingTop: 2,
    marginLeft: 0
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

const menus = (post_id, dispatch, posts, myId) => ([
  (myId !== post_id)
    ? {title: "通報する", icon: "flag", onPress: () => openReportInappropriateContentPage(post_id)}
    : {title: "削除する", icon: "trash-can", onPress: () => deletePost(dispatch, post_id, posts)}
])

const userFetchAction = (navigation, dispatch, postUserId, userId) => async () => {
  const isMyPage = postUserId === userId
  isMyPage && await fetchUserPosts(dispatch, postUserId)
  navigation.navigate("UserHome", {isMyPage})
}

const PostHeader = ({postUser, navigation, setShowMenu}) => {
  const user_id = useSelector(({auth: {user: {user_id}}}) => user_id)
  const dispatch = useDispatch()
  const styles = createStyles()

  return (
    <Appbar.Header style={styles.header} theme={{colors: {primary:"#fff"}}}>
      <TouchableOpacity style={styles.headerLeft} onPress={userFetchAction(navigation, dispatch, postUser.user_id, user_id)}>
        {/* eslint-disable-next-line no-undef */}
        <Avatar.Image size={38} source={postUser.thumbnail_img !== "" ? {uri: postUser.thumbnail_img} : require("../../assets/no_image.png")} />
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

// eslint-disable-next-line
const PostInfo = ({navigation}) => {
  const {post, products, isLoading, masterData} = useSelector(({postDetail: {post, products, isLoading}, app: {masterData}}) => ({post, products, isLoading, masterData}))
  const labelMap = Object.fromEntries(displayItemsList.map(key => [key, parseMasterData(masterData, key, "object")]))
  const styles = createStyles(post.isLike)

  return (
    <>
      <View style={styles.infoContainer}>
        <TextWithReadMore style={styles.description} maxLineCount={3}>{post.description}</TextWithReadMore>
        <View style={styles.tag}>
          <Title style={styles.tagTitle}>ユーザー情報</Title>
          {Object.entries(post).filter(([key, value]) => displayItemsList.includes(key) && value).length > 0 ? <ChipList items={Object.entries(post).filter(([key]) => displayItemsList.includes(key)).map(([key, value]) => ({label: labelMap[key][value], onPress: () => {}}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
          <Title style={styles.tagTitle}>アイテム</Title>
          {products.length > 0 ? <ChipList items={products.map(product => ({label: product.product_name, onPress: () => navigation.navigate("ProductDetail", {product})}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
          <Title style={styles.tagTitle}>ブランド</Title>
          {products.length > 0 ? <ChipList items={products.map(product => ({label: product.brand_name}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
          <Title style={styles.tagTitle}>タグ</Title>
          {post.tags.length > 0 ? <ChipList items={post.tags.map(tag => ({label: "#" + tag}))} /> : <Text style={styles.marginLeft}>情報なし</Text>}
        </View>
        <IconLabel icon="clock" color="#000" style={styles.postTime}>{post.DateTime ? post.DateTime.replace("T", " ").slice(0, -8) : ""}</IconLabel>
      </View>
      <Loading isLoading={isLoading} />
    </>
  )
}

// eslint-disable-next-line complexity
const ReactionContainer = ({navigation}) => {
  const styles = createStyles()
  const dispatch = useDispatch()
  const {post, user_id} = useSelector(({postDetail: {post}, auth: {user: {user_id}}}) => ({post, user_id}))

  return (
    <View style={styles.infoContainer}>
      <View style={styles.centerAlignment}>
        <IconLabel icon="eye" textStyle={styles.strong}>{post.page_views ? post.page_views : 0}</IconLabel>
        <IconLabel icon="heart" textStyle={styles.strong}>{post.like_count ? post.like_count : 0}</IconLabel>
      </View>
      <View style={[styles.buttonContainer, styles.centerAlignment]}>
        <IconButton icon={post.isLike ? "heart" : "heart-outline"} style={styles.leftButtons} color={post.isLike ? primary : "#999"} onPress={() => updateLikePost(dispatch, user_id, post.post_id)} />
        <IconButton icon="comment-outline" style={styles.leftButtons} color="#999" onPress={() => navigation.navigate("Comments")} />
        <IconButton icon={post.isSaved ? "bookmark" : "bookmark-outline"} style={styles.savedButton} color={post.isSaved ? "#333" : "#999"} onPress={() => updateSavedPost(dispatch, user_id, post.post_id)} size={33} />
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
  const {user_id: myId, posts} = useSelector(({auth: {user: {user_id, posts}}}) => ({user_id, posts}))
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react/display-name
    navigation.setOptions({headerRight: () => <ShareButton
      title={`${postUser.nickname}さんの投稿`}
      message={`${postUser.nickname} | ${post.description}`}
      url={post.thumbnail_img}
    />})
  }, [dispatch, postUser.nickname, post.description, post.thumbnail_img])


  return (
    <>
      <ScrollView refreshControl={<PullToRefresh refreshFunc={refreshFunc} />}>
        <PostHeader postUser={postUser} navigation={navigation} setShowMenu={setShowMenu} />
        <Carousel data={post.img_list} />
        <ReactionContainer navigation={navigation} />
        {/* <ProductInfo navigation={navigation} /> */}
        <PostInfo navigation={navigation} />
        {/* <FollowLink postUser={postUser} navigation={navigation} /> */}
      </ScrollView>
      <PopupMenu menus={menus(post.user_id, dispatch, posts, myId)} handleShown={[showMenu, setShowMenu]} />
    </>
  )
}
