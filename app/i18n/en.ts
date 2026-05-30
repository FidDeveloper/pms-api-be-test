import demoEn from "./demo-en"

const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },
  loginScreen: {
    logIn: "Log In",
    enterDetails:
      "Enter your details below to unlock top secret info. You'll never guess what we've got waiting. Or maybe you will; it's not rocket science here.",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToLogIn: "Tap to log in!",
    hint: "Hint: you can use any email address and your favorite password :)",
  },
  demoNavigator: {
    dashboardTab: "Dashboard",
    componentsTab: "Components",
    debugTab: "Debug",
    communityTab: "Community",
    podcastListTab: "Podcast",
  },
  demoCommunityScreen: {
    title: "Connect with the community",
    tagLine:
      "Plug in to Infinite Red's community of React Native engineers and level up your app development with us!",
    joinUsOnSlackTitle: "Join us on Slack",
    joinUsOnSlack:
      "Wish there was a place to connect with React Native engineers around the world? Join the conversation in the Infinite Red Community Slack! Our growing community is a safe space to ask questions, learn from others, and grow your network.",
    joinSlackLink: "Join the Slack Community",
    makeIgniteEvenBetterTitle: "Make Ignite even better",
    makeIgniteEvenBetter:
      "Have an idea to make Ignite even better? We're happy to hear that! We're always looking for others who want to help us build the best React Native tooling out there. Join us over on GitHub to join us in building the future of Ignite.",
    contributeToIgniteLink: "Contribute to Ignite",
    theLatestInReactNativeTitle: "The latest in React Native",
    theLatestInReactNative: "We're here to keep you current on all React Native has to offer.",
    reactNativeRadioLink: "React Native Radio",
    reactNativeNewsletterLink: "React Native Newsletter",
    reactNativeLiveLink: "React Native Live",
    chainReactConferenceLink: "Chain React Conference",
    hireUsTitle: "Hire Infinite Red for your next project",
    hireUs:
      "Whether it's running a full project or getting teams up to speed with our hands-on training, Infinite Red can help with just about any React Native project.",
    hireUsLink: "Send us a message",
  },
  demoShowroomScreen: {
    jumpStart: "Components to jump start your project!",
    lorem2Sentences:
      "Nulla cupidatat deserunt amet quis aliquip nostrud do adipisicing. Adipisicing excepteur elit laborum Lorem adipisicing do duis.",
    demoHeaderTxExample: "Yay",
    demoViaTxProp: "Via `tx` Prop",
    demoViaSpecifiedTxProp: "Via `{{prop}}Tx` Prop",
  },
  demoDebugScreen: {
    howTo: "HOW TO",
    title: "Debug",
    tagLine:
      "Congratulations, you've got a very advanced React Native app template here.  Take advantage of this boilerplate!",
    reactotron: "Send to Reactotron",
    reportBugs: "Report Bugs",
    demoList: "Demo List",
    demoPodcastList: "Demo Podcast List",
    androidReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running, run adb reverse tcp:9090 tcp:9090 from your terminal, and reload the app.",
    iosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    macosReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    webReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
    windowsReactotronHint:
      "If this doesn't work, ensure the Reactotron desktop app is running and reload app.",
  },
  demoPodcastListScreen: {
    title: "React Native Radio episodes",
    onlyFavorites: "Only Show Favorites",
    favoriteButton: "Favorite",
    unfavoriteButton: "Unfavorite",
    accessibility: {
      cardHint:
        "Double tap to listen to the episode. Double tap and hold to {{action}} this episode.",
      switch: "Switch on to only show favorites",
      favoriteAction: "Toggle Favorite",
      favoriteIcon: "Episode not favorited",
      unfavoriteIcon: "Episode favorited",
      publishLabel: "Published {{date}}",
      durationLabel: "Duration: {{hours}} hours {{minutes}} minutes {{seconds}} seconds",
    },
    noFavoritesEmptyState: {
      heading: "This looks a bit empty",
      content:
        "No favorites have been added yet. Tap the heart on an episode to add it to your favorites!",
    },
  },
  loginAccount: {
    heading: "Login My account",
    subheading: "Welcome! Please enter your information\nbelow and get started.",
    emailLabel: "Your email",
    emailPlaceholder: "Enter your email",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    acceptTerms: "Accept Terms and Conditions",
    loginButton: "Login",
    alreadyAccount: "Already have an account?",
    loginLink: "Log in here!",
  },
  boardingScreen: {
    title: "Personalized Pet Profiles",
    description:
      "Create personalized profiles for each of your beloved pets on Furtory Pet Centre. Share their name, breed, and age while connecting with a vibrant community. ",
    getStartedButton: "Get Started",
    skipSignUp: "Sign Up later",
    title1: "Personalized Pet Profiles",
    description1:
      "Create personalized profiles for each of your beloved pets on Furtory Pet Centre. Share their name, breed, and age while connecting with a vibrant community. ",
    title2: "Pet Care Reminders",
    description2:
      "Never forget a vet appointment or medication schedule again! Set up custom reminders for each of your pets and receive timely notifications to keep them healthy and happy.",
    title3: "Community Connection",
    description3:
      "Join a vibrant community of pet lovers! Share photos, stories, and advice about your furry friends, and connect with others who share your passion for pets.",
  },
  SignupScreen: {
    button: "Register",
    Checkbox: "Accept Terms and Conditions",
    title: "Create Accounts",
    subtitle: "Welcome! Please enter your information below and get started.",
  },
  ValidationScreen: {
    button: "Confirm",
    title: "Validation Code",
    subtitle: "Check your email inbox and enter the validation code here",
    link1: "Did not receive the code?",
    link2: "Resend",
  },
  DashboardScreen: {
    button: "Swipe to continue",
    content: "Looks like you have no profile set up at this moment, add your pet now",
    subtitle: "Check your email inbox and enter the validation code here",
    link1: "Did not receive the code?",
    link2: "Resend",
  },
  AddPetNameScreen: {
    button: "Swipe to continue",
    title: "Whats your pet's name",
    input: "Yout pet's name",
    link1: "Did not receive the code?",
    link2: "Resend",
  },
  AddPetSizeRangeScreen: {
    button: "Continue",
    title: "Whats your pet's size",
    input: "Yout pet's name",
    link1: "Did not receive the code?",
    link2: "Resend",
  },

  ...demoEn,
}

export default en
export type Translations = typeof en
