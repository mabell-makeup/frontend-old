import React, {useContext} from "react"
import {ScrollView} from "react-native"
import {List} from "../../components/List"
import {Checkbox} from "react-native-paper"
import {searchStore, updateConditionsItems} from "../../stores/searchStore"

const items = [
  {item_id: 1, item_name: "ナチュラル チークN", brand_name: "セザンヌ", item_category: ["パウダーチーク"], price: "4g・360円 / -・360円", release_date: "2001年 (2020/9/11追加発売)"},
  {item_id: 2, item_name: "つやぷるリップ", brand_name: "B IDOL（ビー アイドル)", item_category: ["口紅"], price: "2.4g・1,400円", release_date: "2019/5/1 (2020/10/8追加発売)"},
  {item_id: 3, item_name: "アイグロウ ジェム", brand_name: "コスメデコルテ", item_category: ["ジェル・クリームアイシャドウ"], price: "2,700円", release_date: "2018/2/16 (2020/4/16追加発売)"},
  {item_id: 4, item_name: "パウダー&ペンシル アイブロウEX", brand_name: "エクセル", item_category: ["アイブロウペンシル"], price: "1,450円", release_date: "2012/4/17 (2014/3/25追加発売)"},
  {item_id: 5, item_name: "UZU アイオープニングライナー", brand_name: "UZU BY FLOWFUSHI", item_category: ["リキッドアイライナー"], price: "1,500円", release_date: "2019/3/14 (2019/7/5追加発売)"},
  {item_id: 6, item_name: "ラブ・ライナー リキッドアイライナーR3", brand_name: "msh(エム・エス・エイチ)", item_category: ["リキッドアイライナー"], price: "0.55ml・1,600円", release_date: "2019/9/2"},
  {item_id: 7, item_name: "塗るつけまつげ ラッシュアップ", brand_name: "デジャヴュ", item_category: ["マスカラ"], price: "1,200円", release_date: "2019/2/1 (2020/10/9追加発売)"},
  {item_id: 8, item_name: "リアルクローズシャドウ", brand_name: "エクセル", item_category: ["パウダーアイシャドウ"], price: "1,500円", release_date: "2018/9/11 (2020/7/7追加発売)"},
  {item_id: 9, item_name: "シルキースフレアイズ", brand_name: "キャンメイク", item_category: ["パウダーアイシャドウ"], price: "4.8g・750円", release_date: "2019/12/1 (2020/9/30追加発売)"},
  {item_id: 10, item_name: "カラフルネイルズ", brand_name: "キャンメイク", item_category: ["マニキュア"], price: "360円", release_date: "2018/4/10 (2020/10/10追加発売)"},
  {item_id: 11, item_name: "コンフォート リップオイル", brand_name: "クラランス", item_category: ["リップケア・リップクリーム", "リップグロス"], price: "6.5g・3,200円", release_date: "2016/5/20 (2020/10/16追加発売)"},
  {item_id: 12, item_name: "超細芯アイブロウ", brand_name: "セザンヌ", item_category: ["アイブロウペンシル"], price: "0.02g・500円", release_date: "2018/3/26 (2019/3/22追加発売)"},
  {item_id: 13, item_name: "密着アイライナー ラスティンファイン クリームペンシル", brand_name: "デジャヴュ", item_category: ["ペンシルアイライナー", "ジェルアイライナー"], price: "1,200円", release_date: "2017/11/1 (2019/10/11追加発売)"},
  {item_id: 14, item_name: "デザイニング カラー アイズ", brand_name: "SUQQU(スック)", item_category: ["パウダーアイシャドウ"], price: "5.6g・6,800円 / -・6,800円", release_date: "2017/1/20 (2020/9/30追加発売)"},
  {item_id: 15, item_name: "ブラッシュ カラー インフュージョン", brand_name: "ローラ メルシエ", item_category: ["パウダーチーク"], price: "6g・3,500円", release_date: "2018/9/19"},
]

const createRows = (items, dispatch, selectedItems) =>
  items.map(item => ({
    title: `${item.brand_name}-${item.item_name}`,
    key: item.item_id,
    // eslint-disable-next-line react/display-name
    right: () => <Checkbox status={selectedItems.includes(item.item_id) ? "checked" : "unchecked"} color="#333" />,
    onPress: () => updateConditionsItems(dispatch, selectedItems, item.item_id)
  }))


export const SelectItems = () => {
  const {dispatch, state} = useContext(searchStore)
  const rows = createRows(items, dispatch, state.conditions.items)

  return (
    <ScrollView>
      <List rows={rows} />
    </ScrollView>
  )
}