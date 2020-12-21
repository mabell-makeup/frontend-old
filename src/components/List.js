import * as React from "react"
import {List as L} from "react-native-paper"

const Item = ({title, ...props}) => <L.Item title={title} {...props} />
// eslint-disable-next-line react/jsx-key
const Accordion = ({title, rows, ...props}) =>
  <L.Accordion title={title} {...props}>
    {rows.map(accordionItem => 
      typeof accordionItem === "object" && accordionItem.$$typeof
        ? accordionItem
        : <Item {...accordionItem}/>
    )}
  </L.Accordion>


/* 
  rowsのフォーマット
  オプションの詳細は、https://callstack.github.io/react-native-paper/list-accordion.html

  const rows = [
    {title: "犬", left: props => <L.Icon {...props} icon="dog" />},
    {title: "猫", rows: [<SelectColor />]},
    {title: "ゴリラ", rows: [
      {title: "マウンテンゴリラ", left: props => <L.Icon {...props} icon="star" />},
      {title: "ニシゴリラ"},
      {title: "ヒガシゴリラ"},
    ]}
  ]
*/
export const List = ({rows=[{title: ""}]}) => {
  return (
    <L.Section>
      {/* eslint-disable-next-line no-prototype-builtins */}
      {rows.map(row => row.hasOwnProperty("rows")? <Accordion key={row.title} {...row} /> : <Item key={row.title} {...row} />)}
    </L.Section>
  )
}
