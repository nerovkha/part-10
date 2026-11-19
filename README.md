# Part 10 — React Native

Exercises for [Full Stack Open](https://fullstackopen.com) part 10
(CSM14111): the rate-repository-app — React Native with Expo, React
Navigation, forms, Apollo Client and authentication.

## Try the app

The app is published with EAS Update and uses the course's pre-deployed
Rate Repository API, so no local setup is needed. Open the Expo Go app
on your phone, sign in (see the note below) and scan the QR code for your platform with its QR
scanner (Projects → "Scan QR code"):

| Android | iOS |
| :-: | :-: |
| ![QR code for Android](./qrcode.png) | ![QR code for iOS](./qrcode-ios.png) |

Published update: [EAS dashboard](https://expo.dev/accounts/nerovkhas-team/projects/rate-repository-app/updates/61f80d72-52e6-4be2-9f95-f14513e70281)

> **Note:** to open the update on a physical device you must be **signed
> in to Expo Go** with an Expo account that is a member of the
> `nerovkhas-team` account (Expo Go → Profile → Log in). EAS only serves
> this project's updates to project members on real devices, so a
> signed-out Expo Go fails with
> `java.io.IOException: Failed to download remote update`. Android
> emulators and iOS simulators are exempt. Use Expo Go for SDK 58 (the
> sign-in fix for Android landed in Expo Go 58,
> [expo/expo#50498](https://github.com/expo/expo/pull/50498)).
>
> Expo Go runs only one SDK and only updates published with the runtime
> `exposdk:<SDK>`, so `app.config.js` sets `runtimeVersion: 'exposdk:58.0.0'`.
> After an SDK upgrade, bump `runtimeVersion` and republish with
> `npx eas-cli update --branch main --environment preview` (the `preview`
> environment holds `EXPO_PUBLIC_APOLLO_URI`), then regenerate the QR codes.

## Run

```bash
npm install
npm start        # Expo dev tools; run on iOS/Android emulator or web
npm run ios      # or npm run android / npm run web
```

## Test

```bash
npm test         # jest-expo + react native testing library
npm run lint
```

## Test in CI

`.github/workflows/ci.yml` installs, lints and unit-tests the app on
every push and pull request. This directory is self-contained — copy
its contents into a new repository and CI works without any extra
setup.
