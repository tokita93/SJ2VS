YVY
====

LTのイベントのために開発された、世界一ゆるい投票システム「YVY」です。
投票者は４つのボタンを選んで何度でも投票可能です。イベントの盛り上がりに合わせて何度でも投票ください！

ボタンの内容はフルカスタマイズが可能です。
また、投票結果をリアルタイムで確認する画面を用意しています。

YVYは「yurui vote yarouze」の略称です。

![yvy_small](https://user-images.githubusercontent.com/10110956/50638872-a17db700-0fa2-11e9-8353-d802e72f8b42.gif)

## Description
![yvy](https://user-images.githubusercontent.com/10110956/50638797-63809300-0fa2-11e9-8305-75200f58aa49.gif)
左が投票画面、右が投票結果確認画面です。
例えば「やばい！」「かっこいい！」みたいなボタンを主催者が設定し、投票者はそれをリアルタイムで投票します。
その結果をアニメーションを交えて投票結果確認画面で見ることができます。

双方の画面はシンプルなhtmlで用意されているため、大掛かりなシステム構築は不要です。
YVYを起動し、htmlにアクセスすれば投票システムがスタートできます。

### 投票画面
![image](https://user-images.githubusercontent.com/10110956/50640114-31bdfb00-0fa7-11e9-8978-8b309b64fda3.png)
投票画面は以下のURLです（index.htmlとして用意されているため、URLだけでアクセス可能です）。
LT会場で各参加者のスマホやPCなどから開くことを想定しています。
```
<URL>
```
名前を入れれば投票をすることが可能です。
投票ボタンはクリック後、1秒待って再度クリック可能になります。


### 投票結果確認画面
![image](https://user-images.githubusercontent.com/10110956/50640168-6336c680-0fa7-11e9-8b51-ba4ca99d9168.png)
投票結果確認画面は以下のURLです。
```
<URL>/monitor.html
```
投票結果を確認することができます。
LT会場でプロジェクタに移して投票結果をモニタリングすることを想定しています。

投票があれば、リアルタイムで文字が表示され、グラフが増加します。
コントロール画面で登壇者を変更すると、それに合わせてグラフも変更されます。

### コントローラ画面
![image](https://user-images.githubusercontent.com/10110956/50640214-7ea1d180-0fa7-11e9-84a5-99a43abcf885.png)

コントローラ画面は以下のURLです。
```
<URL>/controller.html
```
登壇者の変更や結果のダウンロードなどを行うことができます。
LTイベントで主催者が開いて制御することを想定しています。




## Requirement

## Usage

## Install

## Contribution

## Licence

[MIT](https://github.com/tcnksm/tool/blob/master/LICENCE)

## Author

[tcnksm](https://github.com/tcnksm)
