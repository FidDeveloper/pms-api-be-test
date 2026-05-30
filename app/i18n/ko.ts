import demoKo from "./demo-ko"
import { Translations } from "./en"

const ko: Translations = {
  common: {
    ok: "확인!",
    cancel: "취소",
    back: "뒤로",
    logOut: "로그아웃",
  },
  welcomeScreen: {
    postscript:
      "잠깐! — 지금 보시는 것은 아마도 당신의 앱의 모양새가 아닐겁니다. (디자이너분이 이렇게 건내주셨다면 모를까요. 만약에 그렇다면, 이대로 가져갑시다!) ",
    readyForLaunch: "출시 준비가 거의 끝난 나만의 앱!",
    exciting: "(오, 이거 신나는데요!)",
    letsGo: "가보자구요!",
  },
  errorScreen: {
    title: "뭔가 잘못되었습니다!",
    friendlySubtitle:
      "이 화면은 오류가 발생할 때 프로덕션에서 사용자에게 표시됩니다. 이 메시지를 커스터마이징 할 수 있고(해당 파일은 `app/i18n/ko.ts` 에 있습니다) 레이아웃도 마찬가지로 수정할 수 있습니다(`app/screens/error`). 만약 이 오류화면을 완전히 없에버리고 싶다면 `app/app.tsx` 파일에서 <ErrorBoundary> 컴포넌트를 확인하기 바랍니다.",
    reset: "초기화",
    traceTitle: "%{name} 스택에서의 오류",
  },
  emptyStateComponent: {
    generic: {
      heading: "너무 텅 비어서.. 너무 슬퍼요..",
      content: "데이터가 없습니다. 버튼을 눌러서 리프레쉬 하시거나 앱을 리로드하세요.",
      button: "다시 시도해봅시다",
    },
  },

  errors: {
    invalidEmail: "잘못된 이메일 주소 입니다.",
  },
  loginScreen: {
    logIn: "로그인",
    enterDetails:
      "일급비밀 정보를 해제하기 위해 상세 정보를 입력하세요. 무엇이 기다리고 있는지 절대 모를겁니다. 혹은 알 수 있을지도 모르겠군요. 엄청 복잡한 뭔가는 아닙니다.",
    emailFieldLabel: "이메일",
    passwordFieldLabel: "비밀번호",
    emailFieldPlaceholder: "이메일을 입력하세요",
    passwordFieldPlaceholder: "엄청 비밀스러운 암호를 입력하세요",
    tapToLogIn: "눌러서 로그인 하기!",
    hint: "힌트: 가장 좋아하는 암호와 아무런 아무 이메일 주소나 사용할 수 있어요 :)",
  },
  demoNavigator: {
    dashboardTab: "대시보드",
    componentsTab: "컴포넌트",
    debugTab: "디버그",
    communityTab: "커뮤니티",
    podcastListTab: "팟캐스트",
  },
  demoCommunityScreen: {
    title: "커뮤니티와 함께해요",
    tagLine:
      "전문적인 React Native 엔지니어들로 구성된 Infinite Red 커뮤니티에 접속해서 함께 개발 실력을 향상시켜 보세요!",
    joinUsOnSlackTitle: "Slack 에 참여하세요",
    joinUsOnSlack:
      "전 세계 React Native 엔지니어들과 함께할 수 있는 곳이 있었으면 좋겠죠? Infinite Red Community Slack 에서 대화에 참여하세요! 우리의 성장하는 커뮤니티는 질문을 던지고, 다른 사람들로부터 배우고, 네트워크를 확장할 수 있는 안전한 공간입니다. ",
    joinSlackLink: "Slack 에 참여하기",
    makeIgniteEvenBetterTitle: "Ignite 을 향상시켜요",
    makeIgniteEvenBetter:
      "Ignite 을 더 좋게 만들 아이디어가 있나요? 기쁜 소식이네요. 우리는 항상 최고의 React Native 도구를 구축하는데 도움을 줄 수 있는 분들을 찾고 있습니다. GitHub 에서 Ignite 의 미래를 만들어 가는것에 함께해 주세요.",
    contributeToIgniteLink: "Ignite 에 기여하기",
    theLatestInReactNativeTitle: "React Native 의 최신정보",
    theLatestInReactNative: "React Native 가 제공하는 모든 최신 정보를 알려드립니다.",
    reactNativeRadioLink: "React Native 라디오",
    reactNativeNewsletterLink: "React Native 뉴스레터",
    reactNativeLiveLink: "React Native 라이브 스트리밍",
    chainReactConferenceLink: "Chain React 컨퍼런스",
    hireUsTitle: "다음 프로젝트에 Infinite Red 를 고용하세요",
    hireUs:
      "프로젝트 전체를 수행하든, 실무 교육을 통해 팀의 개발 속도에 박차를 가하든 상관없이, Infinite Red 는 React Native 프로젝트의 모든 분야의 에서 도움을 드릴 수 있습니다.",
    hireUsLink: "메세지 보내기",
  },
  demoShowroomScreen: {
    jumpStart: "프로젝트를 바로 시작할 수 있는 컴포넌트들!",
    lorem2Sentences:
      "별 하나에 추억과, 별 하나에 사랑과, 별 하나에 쓸쓸함과, 별 하나에 동경(憧憬)과, 별 하나에 시와, 별 하나에 어머니, 어머니",
    demoHeaderTxExample: "야호",
    demoViaTxProp: "`tx` Prop 을 통해",
    demoViaSpecifiedTxProp: "`{{prop}}Tx` Prop 을 통해",
  },
  demoDebugScreen: {
    howTo: "사용방법",
    title: "디버그",
    tagLine:
      "축하합니다. 여기 아주 고급스러운 React Native 앱 템플릿이 있습니다. 이 보일러 플레이트를 사용해보세요!",
    reactotron: "Reactotron 으로 보내기",
    reportBugs: "버그 보고하기",
    demoList: "데모 목록",
    demoPodcastList: "데모 팟캐스트 목록",
    androidReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후, 터미널에서 adb reverse tcp:9090 tcp:9090 을 실행한 다음 앱을 다시 실행해보세요.",
    iosReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    macosReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    webReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
    windowsReactotronHint:
      "만약에 동작하지 않는 경우, Reactotron 데스크탑 앱이 실행중인지 확인 후 앱을 다시 실행해보세요.",
  },
  demoPodcastListScreen: {
    title: "React Native 라디오 에피소드",
    onlyFavorites: "즐겨찾기만 보기",
    favoriteButton: "즐겨찾기",
    unfavoriteButton: "즐겨찾기 해제",
    accessibility: {
      cardHint:
        "에피소드를 들으려면 두 번 탭하세요. 이 에피소드를 좋아하거나 싫어하려면 두 번 탭하고 길게 누르세요.",
      switch: "즐겨찾기를 사용하려면 스위치를 사용하세요.",
      favoriteAction: "즐겨찾기 토글",
      favoriteIcon: "좋아하는 에피소드",
      unfavoriteIcon: "즐겨찾기하지 않은 에피소드",
      publishLabel: "{{date}} 에 발행됨",
      durationLabel: "소요시간: {{hours}}시간 {{minutes}}분 {{seconds}}초",
    },
    noFavoritesEmptyState: {
      heading: "조금 텅 비어 있네요.",
      content: "즐겨찾기가 없습니다. 에피소드에 있는 하트를 눌러서 즐겨찾기에 추가하세요.",
    },
  },
  loginAccount: {
    heading: "내 계정 로그인",
    subheading: "환영합니다. 시작하려면 아래에 정보를 입력하세요.",
    emailLabel: "이메일",
    emailPlaceholder: "이메일을 입력하세요",
    passwordLabel: "비밀번호",
    passwordPlaceholder: "비밀번호를 입력하세요",
    acceptTerms: "이용약관에 동의합니다",
    loginButton: "로그인",
    alreadyAccount: "이미 계정이 있으신가요?",
    loginLink: "여기서 로그인하세요!",
  },
  boardingScreen: {
    title: "반려동물을 위한 개인화된 프로필",
    description:
      "Furtory Pet Centre에서 사랑하는 반려동물 각각에 대한 개인화된 프로필을 만들어보세요. 이름, 품종, 나이를 공유하면서 활기찬 커뮤니티와 연결하세요.",
    getStartedButton: "시작하기",
    skipSignUp: "나중에 가입하기",
    title1: "개인화된 반려동물 프로필",
    description1:
      "Furtory Pet Centre에서 사랑하는 반려동물 각각에 대한 개인화된 프로필을 만들어보세요. 이름, 품종, 나이를 공유하면서 활기찬 커뮤니티와 연결하세요.",
    title2: "반려동물 케어 알림",
    description2:
      "다시는 수의사 약속이나 약물 일정을 잊지 마세요! 각 반려동물에 대한 맞춤 알림을 설정하고 제때 알림을 받아 건강하고 행복하게 유지하세요.",
    title3: "커뮤니티 연결",
    description3:
      "활기찬 반려동물 애호가 커뮤니티에 참여하세요! 사진, 이야기, 조언을 공유하고 반려동물에 대한 열정을 공유하는 다른 사람들과 연결하세요.",
  },
  SignupScreen: {
    button: "회원가입",
    Checkbox: "이용약관에 동의합니다",
    title: "계정 만들기",
    subtitle: "환영합니다. 시작하려면 아래에 정보를 입력하세요.",
  },
  ValidationScreen: {
    button: "확인",
    title: "인증 코드",
    subtitle: "이메일을 확인하고 인증 코드를 입력하세요",
    link1: "코드를 받지 못했나요?",
    link2: "다시 보내기",
  },
  DashboardScreen: {
    button: "계속하려면 스와이프",
    content: "아직 프로필이 설정되지 않았습니다. 지금 반려동물을 추가하세요",
    subtitle: "이메일을 확인하고 인증 코드를 입력하세요",
    link1: "코드를 받지 못했나요?",
    link2: "다시 보내기",
  },
  AddPetNameScreen: {
    button: "계속하려면 스와이프",
    title: "반려동물의 이름은 무엇인가요",
    input: "반려동물 이름",
    link1: "코드를 받지 못했나요?",
    link2: "다시 보내기",
  },
  AddPetSizeRangeScreen: {
    button: "계속",
    title: "반려동물의 크기는 어느 정도인가요",
    input: "반려동물 이름",
    link1: "코드를 받지 못했나요?",
    link2: "다시 보내기",
  },

  ...demoKo,
}

export default ko
