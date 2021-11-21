# Joker-frontend
WEARのメイクVer.
https://mabell.in

## Start Development

### Requirements
- Node.js >= 14.0.0

### Expo

1. Expo Goのインストール  
    Expo Go はスマホ上でReact Nativeの動作確認を行うことができるツールです。
    1. スマホで[Expo Go](https://expo.dev/client)をダウンロード

1. Expo CLIのインストール
    ```bash
    npm install -g expo-cli
    ```

### モックのリポジトリをクローン
```bash
git submodule update --init --recursive
```

### ローカル環境の構築
1. 依存関係をインストール
    ```bash
    npm install
    ```

1. .envファイルの記述
    ```bash
    cp .env.example .env.dev
    ```

1. APIモックを起動
    ```bash
    cd mock
    npm run mock
    ```

1. Expo DevToolsを起動
    ```bash
    # モックとは別ターミナルで実行
    npm run start:dev
    ```

1. 基本的な
Expoの使い方は以下のURLを参考に。
https://qiita.com/hitotch/items/ea4de1ed408a9ca14fce

### Amplify (WIP)

1. Amplify CLIのインストール & 設定
    1. Amplify CLIのインストール
    ```bash
    npm install -g @aws-amplify/cli
    ```
    1. 設定を開始
    ```bash
    amplify configure
    ```
    1. Amplifyで利用するIAMユーザーを作成
    ```bash
    Sign in to your AWS administrator account:
    # AWSマネジメントコンソールにログインする
    # ログインアカウントは管理者に発行してもらう
    https://console.aws.amazon.com/
    Press Enter to continue
    Specify the AWS Region
    # ap-northeast-1を選択する
    ? region:  ap-northeast-1
    Specify the username of the new IAM user:
    # amplify-${わかりやすい名前} を入力する
    ? user name:  amplify-sunagawa
    ```
    1. **AdministratorAccess-Amplify**のポリシーをアタッチ
    1. accessKeyIdとsecretAccessKeyをメモ
    1. 作成したIAMユーザーをAmplifyに設定
    ```bash
    Enter the access key of the newly created user:
    # メモしたaccessKeyIdとsecretAccessKeyを入力する
    ? accessKeyId:  ********************
    ? secretAccessKey:  ****************************************
    This would update/create the AWS Profile in your local machine
    ? Profile Name:  default
    ```
1. プロジェクト内のAmplifyを初期化
```
amplify init
```

1. amplify の環境情報を取得
```
amplify pull
```
