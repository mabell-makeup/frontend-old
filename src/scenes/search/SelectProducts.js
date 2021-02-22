import React, {useContext, useEffect} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Button, Checkbox} from "react-native-paper"
import {IconTextInput} from "../../components/IconTextInput"
import {PRODUCT_SEARCH_PLACE_HOLDER} from "../../styles/constants"
import {fetchTrendProducts, searchStore, updateTmpProducts, fetchProducts} from "../../stores/searchStore"

const styles = {
  container: {
    marginTop: 5
  },
  button: {
    height: 50,
    marginHorizontal: 5,
    marginTop: 30,
    justifyContent: "center"
  },
  buttonContentStyle: {
    height: "100%"
  }
}

const createRows = (dispatch, suggestionProducts, selectedProducts) =>
  suggestionProducts.map(product => ({
    title: `${product.brand_name}-${product.product_name}`,
    key: product.product_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={selectedProducts.map(p => p.product_id).includes(product.product_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => updateTmpProducts(dispatch, product),
    style: {height: 50, borderBottomWidth: 0.5, borderColor: "#ccc"}
  }))


export const SelectProducts = ({navigation}) => {
  const {dispatch, state: {suggestionProducts, tmpConditions: {products}}} = useContext(searchStore)
  const rows = createRows(dispatch, suggestionProducts, products)

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back",
      // eslint-disable-next-line react/display-name
      headerTitle: () => <IconTextInput placeholder={PRODUCT_SEARCH_PLACE_HOLDER} onChangeText={text => fetchProducts(dispatch, text)} />
    })
    fetchTrendProducts(dispatch)
  }, [dispatch])

  return (
    <ScrollView style={styles.container}>
      <List rows={rows} />
      <Button mode="contained" style={styles.button} contentStyle={styles.buttonContentStyle} onPress={() => navigation.goBack()}>使用アイテムを追加</Button>
    </ScrollView>
  )
}