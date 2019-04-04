# Spotify Shuffle

## Installation Instructions

1. Follow these [React Native CLI Quickstart instructions](https://facebook.github.io/react-native/docs/getting-started). You will also need Android SDK Platform 26 for this app. Use this project in place of initializing a new one.

2. Run the below command in a terminal or Git Bash on Windows. If you use Windows it must be Git Bash or the packages will not install correctly.

    ```
    npm install
    ```

3. Create a Spotify developer account [here](https://developer.spotify.com/dashboard) and create a new app. It should be called something other than Spotify Shuffle.

4. Create a **.env** file in the root directory. Place this code in it.

    ```
    CLIENT_ID=<your clientID from the Spotify app just created>
    SESSION_KEY=SpotifyShuffle
    REDIRECT_URL=spotifyshuffle://auth
    SCOPES=user-read-private|playlist-read|playlist-read-private|streaming|user-read-email|user-library-read
    ```

5. The CLIENT_ID above should use the Client ID that is given to you from the app you just created. Edit the settings of your app and place "spotifyshuffle://auth" as a redirect URI. If you want, you can change it, but it must be the same in both places.

6. Remove these two lines from **/components/initial/SplashScreen**. These are used for refreshing the access token retrieved from Spotify. I have my own Node/Express server running on AWS to do this. Refer to [this repo](https://github.com/hmltnbrn/spotify-shuffle-server) for the code and [this](https://github.com/lufinkey/react-native-spotify) for further elaboration.

    ```
    "tokenSwapURL": Config.TOKEN_SWAP_URL,
    "tokenRefreshURL": Config.TOKEN_REFRESH_URL
    ```

7. Start a virtual device and run the below command.

    ```
    react-native run-android
    ```

## Notes

1. This app uses [React Native Spotify](https://github.com/lufinkey/react-native-spotify) extensively throughout.

2. [Redux Persist](https://github.com/rt2zz/redux-persist) is used to store a user's queue when they exit the app. It is restored when they reopen.

3. [Flow](https://flow.org/en/) is used for type checking. On VS Code, [Flow Language Support](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode) is a good (albeit finicky) extension to use for it. Run the first command to create type definitions for the modules in **package.json**. I've noticed that some packages don't get scanned. Create a stub for it by running the second command if you notice it missing in the **flow-typed** folder.

    ```
    npm run flow-typed
    ```
    ```
    npm run create-stub <package name>
    ```
