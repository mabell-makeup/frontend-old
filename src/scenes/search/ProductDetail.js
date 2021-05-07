import React from "react"
import {View, Text, ScrollView, StyleSheet} from "react-native"
import {Carousel} from "../../components/Carousel"
import {IconLabel} from "../../components/IconLabel"

const styles = StyleSheet.create({
  postCount: {
    margin: 10
  },
  mainInfo: {
    padding: 10
  },
  subInfo: {
    padding: 10,
    marginTop: 10
  },
  product_name: {
    fontSize: 20,
    marginVertical: 10,
    fontWeight: "bold"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10
  }
})

export const ProductDetail = ({route: {params: {product}}}) => {
  return (
    <ScrollView>
      <Text style={styles.postCount}>このアイテムを使用したメイクはX件あります。</Text>
      <Carousel data={[""]} />
      <View style={styles.mainInfo}>
        <Text>{product.brand_name}</Text>
        <Text style={styles.product_name}>{product.product_name}</Text>
        <IconLabel icon="currency-jpy" color="#000">{product.price}</IconLabel>
      </View>
      <View style={styles.subInfo}>
        <Text style={styles.title}>発売日</Text>
        <Text>{product.release_date}</Text>
      </View>
    </ScrollView>
  )
}