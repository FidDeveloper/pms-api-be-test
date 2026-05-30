import demoJa from "./demo-ja"
import { Translations } from "./en"

const ja: Translations = {
  common: {
    ok: "OK",
    cancel: "キャンセル",
    back: "戻る",
    logOut: "ログアウト",
  },
  welcomeScreen: {
    postscript:
      "注目！ — このアプリはお好みの見た目では無いかもしれません(デザイナーがこのスクリーンを送ってこない限りは。もしそうなら公開しちゃいましょう！)",
    readyForLaunch: "このアプリはもう少しで公開できます！",
    exciting: "(楽しみですね！)",
    letsGo: "レッツゴー！",
  },
  errorScreen: {
    title: "問題が発生しました",
    friendlySubtitle:
      "本番では、エラーが投げられた時にこのページが表示されます。もし使うならこのメッセージに変更を加えてください(`app/i18n/jp.ts`)レイアウトはこちらで変更できます(`app/screens/ErrorScreen`)。もしこのスクリーンを取り除きたい場合は、`app/app.tsx`にある<ErrorBoundary>コンポーネントをチェックしてください",
    reset: "リセット",
    traceTitle: "エラーのスタック: %{name}",
  },
  emptyStateComponent: {
    generic: {
      heading: "静かだ...悲しい。",
      content:
        "データが見つかりません。ボタンを押してアプリをリロード、またはリフレッシュしてください。",
      button: "もう一度やってみよう",
    },
  },

  errors: {
    invalidEmail: "有効なメールアドレスを入力してください.",
  },
  loginScreen: {
    logIn: "ログイン",
    enterDetails:
      "ここにあなたの情報を入力してトップシークレットをアンロックしましょう。何が待ち構えているか予想もつかないはずです。はたまたそうでも無いかも - ロケットサイエンスほど複雑なものではありません。",
    emailFieldLabel: "メールアドレス",
    passwordFieldLabel: "パスワード",
    emailFieldPlaceholder: "メールアドレスを入力してください",
    passwordFieldPlaceholder: "パスワードを入力してください",
    tapToLogIn: "タップしてログインしよう！",
    hint: "ヒント: お好みのメールアドレスとパスワードを使ってください :)",
  },
  demoNavigator: {
    dashboardTab: "ダッシュボード",
    componentsTab: "コンポーネント",
    debugTab: "デバッグ",
    communityTab: "コミュニティ",
    podcastListTab: "ポッドキャスト",
  },
  demoCommunityScreen: {
    title: "コミュニティと繋がろう",
    tagLine:
      "Infinite RedのReact Nativeエンジニアコミュニティに接続して、一緒にあなたのアプリ開発をレベルアップしましょう！",
    joinUsOnSlackTitle: "私たちのSlackに参加しましょう",
    joinUsOnSlack:
      "世界中のReact Nativeエンジニアと繋がりたいを思いませんか？Infinite RedのコミュニティSlackに参加しましょう！私達のコミュニティは安全に質問ができ、お互いから学び、あなたのネットワークを広げることができます。",
    joinSlackLink: "Slackコミュニティに参加する",
    makeIgniteEvenBetterTitle: "Igniteをより良くする",
    makeIgniteEvenBetter:
      "Igniteをより良くする為のアイデアはありますか? そうであれば聞きたいです！ 私たちはいつでも最良のReact Nativeのツールを開発する為に助けを求めています。GitHubで私たちと一緒にIgniteの未来を作りましょう。",
    contributeToIgniteLink: "Igniteにコントリビュートする",
    theLatestInReactNativeTitle: "React Nativeの今",
    theLatestInReactNative: "React Nativeの現在をあなたにお届けします。",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "あなたの次のプロジェクトでInfinite Redと契約する",
    hireUs:
      "それがプロジェクト全体でも、チームにトレーニングをしてあげたい時でも、Infinite RedはReact Nativeのことであればなんでもお手伝いができます。",
    hireUsLink: "メッセージを送る",
  },
  demoShowroomScreen: {
    jumpStart: "あなたのプロジェクトをスタートさせるコンポーネントです！",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "`tx`から",
    demoViaSpecifiedTxProp: "`{{prop}}Tx`から",
  },
  demoDebugScreen: {
    howTo: "ハウツー",
    title: "デバッグ",
    tagLine:
      "おめでとうございます、あなたはとてもハイレベルなReact Nativeのテンプレートを使ってます。このボイラープレートを活用してください！",
    reactotron: "Reactotronに送る",
    reportBugs: "バグをレポートする",
    demoList: "デモリスト",
    demoPodcastList: "デモのポッドキャストリスト",
    androidReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して, このコマンドをターミナルで実行した後、アプリをアプリをリロードしてください。 adb reverse tcp:9090 tcp:9090",
    iosReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    macosReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    webReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
    windowsReactotronHint:
      "もし動かなければ、Reactotronのデスクトップアプリが実行されていることを確認して、アプリをリロードしてください。",
  },
  demoPodcastListScreen: {
    title: "React Native Radioのエピソード",
    onlyFavorites: "お気に入り表示",
    favoriteButton: "お気に入り",
    unfavoriteButton: "お気に入りを外す",
    accessibility: {
      cardHint: "ダブルタップで再生します。 ダブルタップと長押しで {{action}}",
      switch: "スイッチオンでお気に入りを表示する",
      favoriteAction: "お気に入りの切り替え",
      favoriteIcon: "お気に入りのエピソードではありません",
      unfavoriteIcon: "お気に入りのエピソードです",
      publishLabel: "公開日 {{date}}",
      durationLabel: "再生時間: {{hours}} 時間 {{minutes}} 分 {{seconds}} 秒",
    },
    noFavoritesEmptyState: {
      heading: "どうやら空っぽのようですね",
      content:
        "お気に入りのエピソードがまだありません。エピソードにあるハートマークにタップして、お気に入りに追加しましょう！",
    },
  },
  loginAccount: {
    heading: "アカウントにログイン",
    subheading: "ようこそ。開始するには以下に情報を入力してください。",
    emailLabel: "メールアドレス",
    emailPlaceholder: "メールアドレスを入力してください",
    passwordLabel: "パスワード",
    passwordPlaceholder: "パスワードを入力してください",
    acceptTerms: "利用規約に同意します",
    loginButton: "ログイン",
    alreadyAccount: "すでにアカウントをお持ちですか？",
    loginLink: "こちらからログイン",
  },
  boardingScreen: {
    title: "パーソナライズされたペットプロフィール",
    description:
      "Furtory Pet Centreで、愛するペットそれぞれのパーソナライズされたプロフィールを作成してください。彼らの名前、品種、年齢を共有し、活気に満ちたコミュニティとつながります。",
    getStartedButton: "始めましょう",
    skipSignUp: "後でサインアップ",
    title1: "パーソナライズされたペットプロフィール",
    description1:
      "Furtory Pet Centreで、愛するペットそれぞれのパーソナライズされたプロフィールを作成してください。彼らの名前、品種、年齢を共有し、活気に満ちたコミュニティとつながります。",
    title2: "ペットケアのリマインダー",
    description2:
      "獣医の予約や薬のスケジュールを忘れることはもうありません！各ペットのカスタムリマインダーを設定し、健康で幸せな状態を保つためのタイムリーな通知を受け取ります。",
    title3: "コミュニティ接続",
    description3:
      "ペット愛好家の活気に満ちたコミュニティに参加しましょう！あなたの毛皮の友達について写真、ストーリー、アドバイスを共有し、ペットへの情熱を共有する他の人とつながります。",
  },
  SignupScreen: {
    button: "登録",
    Checkbox: "利用規約に同意する",
    title: "アカウント作成",
    subtitle: "ようこそ。開始するには以下に情報を入力してください。",
  },
  ValidationScreen: {
    button: "確認",
    title: "認証コード",
    subtitle: "メールを確認して認証コードを入力してください",
    link1: "コードが届きませんでしたか？",
    link2: "再送信",
  },
  DashboardScreen: {
    button: "続行するにはスワイプ",
    content: "現在プロフィールが設定されていないようです。今すぐペットを追加してください",
    subtitle: "メールを確認して認証コードを入力してください",
    link1: "コードが届きませんでしたか？",
    link2: "再送信",
  },
  AddPetNameScreen: {
    button: "続行するにはスワイプ",
    title: "ペットの名前は何ですか",
    input: "ペットの名前",
    link1: "コードが届きませんでしたか？",
    link2: "再送信",
  },
  AddPetSizeRangeScreen: {
    button: "続行",
    title: "ペットのサイズはどれくらいですか",
    input: "ペットの名前",
    link1: "コードが届きませんでしたか？",
    link2: "再送信",
  },

  ...demoJa,
}

export default ja
