# DVDスクリーンセーバー風アニメーション

これは、かつてのDVDプレイヤーで見られたスクリーンセーバーをウェブブラウザ上で再現したものです。テキストロゴが画面の端に当たると色を変えながら跳ね返ります。

## 概要

このプロジェクトは、HTML、CSS（Tailwind CSS）、およびJavaScriptを使用して作成されています。ユーザーは表示されるテキストやロゴの数をカスタマイズでき、設定パネルの表示/非表示も切り替え可能です。

## ✨ 特徴

* **カスタマイズ可能なテキスト**: スクリーンセーバーに表示されるテキストを自由に変更できます。
* **可変なロゴ数**: 画面内を飛び回るロゴの数を1から20個の間で調整できます。
* **色の変化**: ロゴが画面の端に衝突するたびに、ランダムに色が変わります。
* **角ヒット通知**: ロゴが画面の角にちょうど当たると、メッセージでお知らせします。
* **設定パネル**:
    * 左上に配置され、テキストとロゴ数を簡単に変更できます。
    * 表示/非表示を切り替え可能で、非表示時は控えめなトグルボタンになります。
* **レスポンシブデザイン**: ブラウザのウィンドウサイズに応じてロゴのサイズが調整されます。
* **軽量**: 画像アセットを使用せず、テキストベースで動作します。

## 🚀 使い方
you-sk/dvd-screen-saver
1.  このリポジトリをクローンまたはダウンロードします。
    ```bash
    git clone https://github.com/you-sk/dvd-screen-saver.git
    ```
2.  `index.html` ファイルをウェブブラウザで開きます。

特別なビルドプロセスや依存関係のインストールは不要です。

## 🔧 カスタマイズ

画面左上の設定パネルから、以下の項目をリアルタイムで変更できます。

* **テキスト**: ロゴとして表示される文字列。
* **数**: 表示されるロゴの個数（1〜20）。

「適用」ボタンを押すと、変更がスクリーンセーバーに反映されます。
「設定を隠す」/「設定」ボタンで設定パネルの表示を切り替えられます。

## 🎨 コードのカスタマイズ

コードを直接編集することで、さらに詳細なカスタマイズが可能です。

* **色**: `script` タグ内の `colors` 配列を編集することで、ロゴが変化する色のリストを変更できます。
    ```javascript
    const colors = [
        '#FF0000', // 赤
        '#00FF00', // 緑
        // ...他の色
    ];
    ```
* **ロゴの初期速度**: `createLogo` 関数内の `dx` および `dy` の計算ロジックを変更することで、ロゴの移動速度の範囲を調整できます。
    ```javascript
    // function createLogo(text) 内
    dx: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.5 + 1), // 1から2.5のランダムな速度
    dy: (Math.random() < 0.5 ? -1 : 1) * (Math.random() * 1.5 + 1),
    ```
* **フォントサイズ**: CSSの `.logo` クラス内の `font-size` プロパティを変更することで、ロゴの基本サイズを調整できます（現在はビューポート幅の3% `3vw` に設定されています）。

## 🖼️ デモ
https://you-sk.github.io/dvd-screen-saver/

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細については、`LICENSE` ファイルをご覧ください。
