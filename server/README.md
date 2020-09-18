# GraphQL-Typescript-StartKit
いつでもTypescript + GraphQLサーバをプロジェクトで利用できるようにするためのテンプレートです。

# 使い方
npxが使用できる環境で、以下のコマンドを実行する。

```
npx degit https://github.com/KitaharaMugiro/GraphQL-Typescript-StartKit <Directory Name>
```

サーバを立ち上げるには以下のコマンドを実行します。

```
npm install
npm run start
```

サーバ画面で以下を記述するとレスポンスが返ってきます。

```
query {
  messages {
    id,
    user,
    content
  }
}
```

```
mutation {
  postMessage(user: "user", content:"hoge")
}
```

# 内容

- [x] grapql-yogaのインストール & コマンドのセットアップ
- [x] TypeScriptのインストール
- [x] デモページ(Query, Mutation)
- [x] Pubsub(Websocket)
- [ ] テスト環境のセットアップ
- [ ] 最低限必要なライブラリのインストール
- [ ] ホットリロード
- [ ] ベストプラクティスのディレクトリ構造
- [ ] デモをリッチにさせてGraphQLを利用する際のテンプレにする
- [ ] TypeScriptを生かしたプラクティスの導入