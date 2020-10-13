import * as React from "react"
import {List as L} from "react-native-paper"

const Item = ({title, ...props}) => <L.Item key={title} title={title} {...props} />
// eslint-disable-next-line react/jsx-key
const Accordion = ({title, items, ...props}) => <L.Accordion title={title} {...props}>{items.map(accordionItem => <Item {...accordionItem} />)}</L.Accordion>


/* 
  itemsのフォーマット
  オプションの詳細は、https://callstack.github.io/react-native-paper/list-accordion.html

  const items = [
    {title: "犬", left: props => <L.Icon {...props} icon="dog" />},
    {title: "猫", left: props => <L.Icon {...props} icon="cat" />},
    {title: "ゴリラ", items: [
      {title: "マウンテンゴリラ", left: props => <L.Icon {...props} icon="star" />},
      {title: "ニシゴリラ"},
      {title: "ヒガシゴリラ"},
    ]}
  ]
*/
export const List = ({items=[{title: ""}]}) => {
  return (
    <L.Section>
      {/* eslint-disable-next-line no-prototype-builtins */}
      {items.map(item => item.hasOwnProperty("items")? <Accordion {...item} /> : <Item {...item} />)}
    </L.Section>
  )
}
