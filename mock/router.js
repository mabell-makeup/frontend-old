import * as q from "./querys"
import * as db from "./db"

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const router = [
  // すぐに使いそうなのでコメントアウトにしておく。不要であれば消してもOK。
  // [q.getSuggestionItems,
  //   {
  //     suggestionItems: db.items.slice(0, 20).map(item => ({item_id: item.item_id, brand_name: item.brand_name, item_name: item.item_name}))
  //   }
  // ],
  [q.queryGetMasterType,
    {
      "base_color": {"イエベ":0,"ブルベ":1},
      "color": {"#A1007E(パープル)":5,"#693A2F(ダークブラウン)":7,"#FCA001(オレンジ)":1,"#0772B6(ブルー)":4,"#E3B1B8(ライトブラウン)":6,"#000000(ブラック)":10,"#009824(グリーン)":3,"#EF0001(レッド)":0,"#C0C0C0(シルバー)":9,"#C1AB05(ゴールド)":8,"#FEF500(イエロー)":2},
      "country": {"欧米":3,"韓国":1,"中国":2,"日本":0,"その他":4},
      "face_type": {"丸顔":1,"面長":2,"ベース型":3,"卵型":0,"逆三角形":4},
      "id": "0",
      "is_glitter": null,
      "makeup_categories": {"アイブロウ":3,"シェーディング":10,"リップ":7,"フェイスパウダー":2,"チーク":8,"マスカラ":6,"アイライン":5,"アイシャドウ":4,"下地":0,"ファンデ":1,"ハイライト":9},
      "season": {"春":0,"秋":2,"冬":3,"夏":1},
      "skin_type": {"乾燥肌":2,"普通肌":0,"脂性肌":1,"混合肌":3}
    }
  ],
  [q.queryListPostTypes,
    {
      listPostTypes: {
        items: shuffle(db.posts.slice(0, 5)).map(post => ({post_id: post.post_id, thumbnail_img_src: post.thumbnail_img_src}))
      }
    }
  ],
  [q.getPostsByConditions,
    {
      posts: db.posts.slice(0, 2).map(post => ({post_id: post.post_id, thumbnail_img_src: post.thumbnail_img_src}))
    }
  ],
  [q.getPostDetail, shuffle(db.posts.slice(0, 4)).pop()],
  [q.getSuggestionKeywords,
    {
      suggestionKeywords: Array.from(new Set(db.posts.slice(0, 2).flatMap(post => post.tags)))
    }
  ],
  [q.getTrendKeywords,
    {
      trendKeywords: Array.from(new Set(db.posts.slice(0, 2).flatMap(post => post.tags)))
    }
  ],
  [q.updateLikePost,
    {
      result: true
    }
  ],
  [q.getItems, db.items.slice(0, 5)]
]