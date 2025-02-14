# タイマー機能付き4択クイズアプリ 要件定義書

## 1. 目的
ユーザーが楽しみながら知識を試すことができる、タイマー機能付きの4択クイズアプリを提供する。

## 2. 機能要件

### 2.1 スタート画面
- ユーザーが名前を入力できるテキストフィールドを表示する
- 「スタート」ボタンを表示する
- 入力された名前を保存する
- 「スタート」ボタンクリックでクイズ選択画面に遷移する

### 2.2 クイズ選択画面
- 利用可能なクイズのリストを表示する
- 各クイズに対して、タイトルと問題数を表示する
- ユーザーがクイズを選択できるようにする
- 選択されたクイズの最初の問題画面に遷移する

### 2.3 クイズ問題画面
- 問題文を表示する
- 入力フォーム・選択肢を表示する
- 各問題に対するタイマーを表示し、カウントダウンを開始する
- ユーザーが選択肢を選ぶと、次の問題に遷移する
- タイマーが0になった場合、自動的に次の問題に遷移する
- 最後の問題が終了したら、終了画面に遷移する

### 2.4 終了画面（回答結果）
- ユーザーの名前を表示する
- 正解数と総問題数を表示する
- 正答率を表示する
- 各問題の正誤結果を一覧表示する
- 「もう一度プレイ」ボタンを表示し、クリックでクイズ選択画面に戻る

### 2.5 データ管理
- ユーザーの名前を保存する
- クイズの結果（正解数、正答率）を保存する
- 過去のプレイ履歴を保存し、表示できるようにする

### 2.6 クイズ管理
- 複数のクイズセットを管理できるようにする
- 各クイズセットに対して、問題数を可変に設定できるようにする

### 2.7 タイマー機能
- 各問題に対して個別にタイマーを設定する
- タイマーの残り時間を視覚的に表示する
- タイマーが0になった時の処理を実装する（自動的に次の問題へ遷移）

## 3. 非機能要件

- ユーザビリティ：直感的で使いやすいインターフェースを提供する
- パフォーマンス：問題の切り替えやタイマーの動作がスムーズであること
- 信頼性：クイズの途中で予期せぬ終了が起こらないよう安定性を確保する
- 拡張性：新しいクイズセットの追加が容易にできるようにする
