# Contribution Guide

## 課題

課題は[Jira](https://mabell.atlassian.net/jira/software/c/projects/MB/boards/5/backlog?issueLimit=100)で管理しています。


## ブランチルール
- 基本的には、git-flowに従います。
- 課題ごとにfeatureブランチを切ってください。
- featureブランチの命名はケバブケースを用い、Jiraの課題キーを紐付けてください。  
例)
  ```
  feature/MB-XX/add-hoge-component
  ```
- コミットメッセージにはいずれかのPrefixをつけてください。  
例)
  ```
  fix: ほげふがの動作を修正
  ```

### Prefix一覧

| prefix | 説明 |
| :--: | :-- |
| fix | バグの修正 |
| add | 新しい機能,新しいファイルの追加 |
| update | バグではない機能修正 |
| docs | README.mdやCONTRIBUTNG.mdなどのドキュメントの変更 |
| refactor | アプリの動作に影響しないコードの修正 |
| | パフォーマンスや可読性を向上させる修正 |
| | スペースやインデントの調整 |
| test | テストに関する内容 |
| chore | その他,雑用 |


## 作業手順

1. DevelopブランチからFeatureブランチを作る！！！！！！  
`git checkout -b feature/MB-XX/add-hoge-component origin/develop`
1. 新規ブランチをPushする (リモートブランチを作成するとJiraの課題が**進行中**へ移動します)  
`git push -u origin feature/MB-XX/add-hoge-component`  
1. コードを変更する
1. (テストを実行する)
1. 変更をコミットする  
`git commit -am 'add: ホゲホゲフォームを追加'`
1. 変更をPushする  
`git push`  
1. Pull Requestを作成する

## 動作確認手順

動作確認手順については、[README.mdのStart Development](https://github.com/daiti0113/Joker-frontend#start-development)を参照してください。

## テスト

現在、テストは存在しません。
