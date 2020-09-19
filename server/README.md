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
- [x] GraphQL Code Generator
- [ ] テスト環境のセットアップ
- [ ] ホットリロード
- [ ] Authorization
- [ ] AppSyncs

# GraphQL Code Generatorの使い方
設定ファイルcodegen.ymlをもとに以下スクリプトで自動的に型ファイルが生成される。

```
npm run generate
```

# Schema First Development
① Schemaを記述する
② Typeを自動生成する
③ Resolverを実装する

所感としてはやりにくい。。もう少しベストプラクティスを見たい。


対応するCode First Developmentについてはこちら
https://www.prisma.io/blog/introducing-graphql-nexus-code-first-graphql-server-development-ll6s1yy5cxl5

# ドキュメント
[GraphQL Code Generator](https://graphql-code-generator.com/)
