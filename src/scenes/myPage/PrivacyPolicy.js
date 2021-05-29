import React from "react"
import {Text, ScrollView, StyleSheet} from "react-native"

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  heading: {
    fontSize: 20,
    marginTop: 40
  },
  subHeading: {
    fontSize: 18,
    lineHeight: 20,
    marginTop: 30
  },
  paragraph: {
    marginTop: 14,
    paddingHorizontal: 8,
    lineHeight: 20
  }
})


// eslint-disable-next-line max-lines-per-function
export const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>プライバシーポリシー</Text>
      <Text style={styles.paragraph}>{"mabell運営事務局（以下、「当事務局」といいます。）は、当事務局の提供するサービス（以下、「本サービス」といいます。）における、ユーザーの個人情報を含む利用者情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。"}</Text>

      <Text style={styles.heading}>1. 収集する利用者情報及びその収集方法</Text>
      <Text style={styles.paragraph}>{"本ポリシーにおける「利用者情報」とは、ユーザーの識別にかかる情報、通信サービス上の行動履歴、そのユーザーの端末においてユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき当事務局が収集するものを意味することとします。本サービスにおいて当事務局が収集する利用者情報は、以下のようなものとなります。"}</Text>

      <Text style={styles.subHeading}>(1) ユーザーからご提供いただく情報</Text>
      <Text style={styles.paragraph}>{`・氏名
・生年月日
・メールアドレス
・写真
・その他当事務局が定める入力フォームにユーザーが入力する情報`}</Text>

      <Text style={styles.subHeading}>(2) ユーザーが本サービスを利用するにあたって、他サービスと連携を許可することにより、当該他サービスからご提供いただく情報</Text>
      <Text style={styles.paragraph}>{`・当該外部サービスでユーザーが利用するID
・その他当該外部サービスのプライバシー設定によりユーザーが連携先に開示を認めた情報`}</Text>

      <Text style={styles.subHeading}>(3) ユーザーが本サービスを利用するにあたって、当事務局が収集する情報</Text>
      <Text style={styles.paragraph}>{`・ブラウザ情報
・ログ情報
・Cookie及び匿名ID
・各OSが提供する広告ID
当事務局では、本サービスの利便性をあげるために、上記に掲げる情報を保存、利用します。また当事務局ではCookieや JavaScriptなどの技術を利用し、ユーザーの行動履歴を取得することがあります。なお、これらには個人情報は含まれません。`}</Text>

      <Text style={styles.subHeading}>(4) Googleアナリティクスから収集するユーザー属性情報</Text>
      <Text style={styles.paragraph}>{`本サービスがトラフィックデータ収集のために利用しているGoogleアナリティクスから収集する以下の様なユーザー属性情報
・年齢
・性別
・興味
・関心
なお、これらのデータは個人を特定できない形式に加工された上で収集されます。Googleアナリティクスの詳細についてはGoogleアナリティクスサービス利用規約をご確認ください。
また、ユーザーが Googleパートナーのサイトやアプリを使用する際の Google によるデータ使用については、こちらをご確認ください。`}</Text>

      <Text style={styles.heading}>2. 利用目的</Text>
      <Text style={styles.paragraph}>{`ユーザーから取得した利用者情報は、以下の目的のために利用されます。

・本サービスに関する登録の受付、本人確認等、本サービスの提供、維持、保護及び改善のため
・本サービスに関するご案内、お問い合わせ等への対応のため
・本サービスに関する当事務局の規約、ポリシー等（以下「規約等」といいます）に違反する行為に対する対応のため
・本サービスに関する規約等の変更、システムメンテナンスその他重要なお知らせ等について通知するため
・本サービス内におけるコミュニティ機能の提供のため
・本サービスに関する懸賞、サンプリング、その他キャンペーンの実施のため
・本サービスに関する料金請求及びユーザー還元収益の計算のため
・当事務局の他のサービス、セミナー・スクール等のご案内やメールマガジンの配信のため
・当事務局のサービスに関連して、個人を特定できない形式に加工した統計データを作成するため
・当事務局または第三者の広告配信または表示、及び成果確認のため
・当事務局または第三者が提供しているサービスまたは将来提供するサービスに関するマーケティング調査、統計及び分析に利用するため
・上記の利用目的に付随する利用目的のため
利用者情報は、安心安全で快適なユーザー体験の提供や、サービスの維持改善、当事務局と皆様とのコミュニケーション、マーケティング等のために活用させていただきます。`}</Text>

      <Text style={styles.heading}>3. 第三者提供</Text>
      <Text style={styles.paragraph}>{`当事務局は、利用者情報のうち、個人情報については、個人情報保護法その他の法令に基づき開示が認められる場合を除くほか、あらかじめユーザーの同意を得ないで、第三者に提供しません。ただし、次に掲げる場合はこの限りではありません。
・当事務局が利用目的の達成に必要な範囲内において個人情報の取り扱いの全部または一部を委託する場合
・合併その他の事由による事業の承継に伴って個人情報が提供される場合
・国の機関もしくは地方公共団体、またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合
・その他、個人情報保護法その他の法令で認められる場合
個人情報保護法やその他の法令によって認められる場合を除き、当事務局が、個人を特定できる情報を第三者に提供することは原則としてありません。`}</Text>

      <Text style={styles.heading}>4. 個人情報の訂正及び利用停止等</Text>
      <Text style={styles.paragraph}>{`当事務局はユーザーから、個人情報の訂正または利用停止を求められた場合には、ユーザーご本人からのご請求であることを確認の上で遅滞なく必要な調査を行い、 その結果に基づき、個人情報の内容の訂正または利用停止を行います。なお、合理的な理由に基づいて訂正または利用停止を行わない旨の決定をしたときは、ユーザーに対しその旨を通知します。
当事務局は、ユーザーから、ユーザーの個人情報について消去を求められた場合、当事務局が当該請求に応じる必要があると判断した場合は、ユーザーご本人からのご請求であることを確認の上で、個人情報の消去を行い、その旨をユーザーに通知します。
ユーザーは、本サービスの利用をやめることまたは本サービスのアプリケーションをアンインストールすることにより、当事務局による利用者情報の取得を停止することができます。`}</Text>

      <Text style={styles.heading}>5. 免責</Text>
      <Text style={styles.paragraph}>{`以下の場合は、第三者による個人情報の取得に関し、当事務局は何らの責任を負いません。
・ユーザー自らが当サービス上の機能または別の手段を用いて第三者に個人情報を明らかにする場合
・ユーザーが本サービス上に入力した情報、活動情報等により、期せずして個人が特定できてしまった場合
・第三者が当サイト外で個人情報その他の利用者情報を取得した場合
・ユーザーご本人以外がユーザー個人を識別できる情報(ID・パスワード等を含みます)を入手した場合`}</Text>

      <Text style={styles.heading}>6. プライバシーポリシーの変更手続き</Text>
      <Text style={styles.paragraph}>{"当事務局は利用者情報の取り扱いに関する運用状況を適宜見直し、継続的な改善に努めるものとし、必要に応じて、随時本ポリシーを変更することができるものとします。"}</Text>

      <Text style={styles.heading}>7. お問い合わせ先</Text>
      <Text style={styles.paragraph}>{"mabell.contact@gmail.com"}</Text>

      <Text style={styles.paragraph}>{"2021年5月8日制定"}</Text>
    </ScrollView>
  )
}