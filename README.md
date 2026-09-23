# みんなの野菜畑（野菜ページ一覧）

学校で育てている野菜ごとのページへの入口となる一覧ページです。
`vegetables.json` に書いた野菜が、カードとして並びます。

## ファイル構成

| ファイル | 役割 |
| --- | --- |
| `index.html` | ページ本体（通常は編集不要） |
| `style.css` | デザイン |
| `script.js` | `vegetables.json` を読み込んでカードを作る |
| `vegetables.json` | 野菜の一覧データ（**ここだけ編集すればOK**） |

## 野菜を追加する

`vegetables.json` の配列に1項目書き足します。

```json
[
  {
    "name": "トマト",
    "url": "https://example.github.io/tomato/",
    "thumbnail": "",
    "description": "夏野菜・果菜類"
  },
  {
    "name": "ピーマン",
    "url": "https://example.github.io/piman/",
    "thumbnail": "images/piman.jpg",
    "description": "夏野菜・ナス科"
  }
]
```

| 項目 | 必須 | 内容 |
| --- | --- | --- |
| `name` | 必須 | 野菜の名前 |
| `url` | 必須 | 野菜ページのURL（`http://` または `https://`、もしくはこのサイト内の相対パス） |
| `thumbnail` | 任意 | 画像のURL。空欄や読み込み失敗時は、葉っぱと頭文字の絵が表示されます |
| `description` | 任意 | 短い説明（例：夏野菜、果菜類） |

注意点：

- 項目と項目の間には `,`（カンマ）が必要です。**最後の項目の後ろにはカンマを付けません。**
- 書き方を間違えると、ページに「読み込めませんでした」と表示されます。[JSONLint](https://jsonlint.com/) などで確認できます。
- 画像はリポジトリに `images/` フォルダを作って置き、`"thumbnail": "images/tomato.jpg"` のように書くのがおすすめです。

## GitHub Pages で公開する

1. このリポジトリを GitHub に push する（ファイルはリポジトリ直下に置いたまま）
2. GitHub のリポジトリ画面で **Settings → Pages** を開く
3. **Build and deployment** の **Source** で「Deploy from a branch」を選ぶ
4. **Branch** で公開したいブランチ（例：`main`）とフォルダ `/ (root)` を選び、**Save**
5. 数分後、同じ画面の上部に公開URL（`https://<ユーザー名>.github.io/<リポジトリ名>/`）が表示されます

以降は `vegetables.json` を編集して push するたびに、自動で反映されます（反映まで1〜数分かかります）。

## 手元で確認する

`index.html` をダブルクリックで開くと、ブラウザの制限で `vegetables.json` が読み込めません。
リポジトリのフォルダで簡易サーバーを起動して確認してください。

```sh
python3 -m http.server 8000
# ブラウザで http://localhost:8000 を開く
```

## カスタマイズ

- サイト名・説明文：`index.html` の `<title>` と `<header>` 内の文言
- 色：`style.css` 冒頭の `:root` にある色の変数
