
# GeneratePairs - Docker環境構築 🚀

このドキュメントでは、Dockerを使用してGeneratePairsプロジェクトをセットアップし、実行する方法を説明します。

## 前提条件 ✅

セットアップを始める前に、以下のソフトウェアがインストールされていることを確認してください：

- [Docker](https://www.docker.com/get-started) 🐳
- [Docker Compose](https://docs.docker.com/compose/install/) 🛠️

## プロジェクト構成 📂

プロジェクトのディレクトリ構成は以下の通りです：
```
GeneratePairs/
├── html/
│   └── index.html       # メインのHTMLファイル
├── css/
│   └── styles.css       # CSSファイル
├── js/
│   └── script.js        # JavaScriptファイル
├── images/              # 画像アセット
│   └── background.jpg
├── Dockerfile           # Dockerfile
├── nginx.conf           # Nginx設定ファイル
└── docker-compose.yml   # Docker Composeファイル
```

## 環境構築方法 🛠️

### 1. リポジトリをクローン 🌐

GitHubからプロジェクトリポジトリをクローンします：
```bash
git clone https://github.com/neko-roy/GeneratePairs.git
cd GeneratePairs
```
### 2. Docker環境をビルドして起動 🚀
以下のコマンドを実行して、Dockerイメージをビルドし、コンテナを起動します：


コードをコピーする
```bash
docker-compose up --build
```
これにより以下が実行されます：

Dockerfile を使用してDockerイメージをビルド。
プロジェクトファイルを使用してNginxサーバーを起動。
3. アプリケーションにアクセス 🌐
コンテナが起動したら、以下のURLでアプリケーションにアクセスできます：
http://localhost:8080/GeneratePairs
正しくセットアップされていれば、GeneratePairsのインターフェースが表示されます。 🎉

## トラブルシューティング 🛠️
### よくある問題 ⚠️
1. アセットの404 Not Foundエラー 🚫
html、css、js、およびimagesフォルダ内のファイルパスがプロジェクトファイルで指定されたものと一致していることを確認してください。
コンテナ内にファイルが正しくコピーされているか確認：
```bash
docker exec -it generate_pairs ls /usr/share/nginx/html
```
2. Nginx設定の問題 ⚙️
nginx.conf ファイルが正しいことを確認してください。
/GeneratePairs パスが /usr/share/nginx/html/home/index.html にマッピングされていることを確認してください。
3. パーミッションエラー 🔒
プロジェクトファイルの権限が正しいことを確認してください。
コンテナ内のファイルがNginxによって読み取り可能である必要があります。
コンテナの再ビルド ♻️
プロジェクトファイルや設定を変更した場合、以下のコマンドでコンテナを再ビルドしてください：

```bash
docker-compose down --volumes --remove-orphans
docker-compose up --build
```
## カスタマイズ 🎨
### Nginx設定を変更する ⚙️
Nginxの設定を更新する必要がある場合は、nginx.conf ファイルを修正し、コンテナを再ビルドしてください。

### 新しいファイルを追加する 📂
新しいアセットを適切なディレクトリ（例：html/、css/、js/、images/）に配置します。
対応するHTMLまたは設定ファイルを更新して、新しいアセットを参照します。
### クリーンアップ 🧹
Dockerコンテナ、ネットワーク、およびボリュームを停止して削除するには、以下を実行します：

```bash
docker-compose down --volumes
```
