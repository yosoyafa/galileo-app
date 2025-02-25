# Galileo App

Welcome to the Galileo App! This project is an Expo-based React Native application that allows users to explore planets in our solar system. The app features a list of planets, detailed views for each planet, and the ability to mark planets as favorites.
Galileo API Server can be found in a [separate repo](https://github.com/yosoyafa/galileo-server).

https://github.com/user-attachments/assets/2fd3635b-a603-4135-9c42-93e8aeba5246

## Table of Contents

- Getting Started
- Running the App
- Project Structure
- Architecture
- Technologies Used

## Getting Started

To get started with the Galileo App, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yosoyafa/galileo-app.git
   cd galileo-app
   ```

2. **Install dependencies:**

    ```sh
   yarn install
   ```

3. **Start the app:**

    ```sh
   yarn start
   ```
   This command will start the Expo development server. You can then open the app in an iOS simulator, Android emulator, or on a physical device using the Expo Go app.

## Running the App

To run the app on different platforms, use the following commands:

- iOS:
   ```sh
   yarn ios
   ```

- Android:
   ```sh
   yarn ios
   ```

## Architecture
The Galileo App follows a modular architecture with the following key components:

1. App Directory:

- Contains the main application screens and layouts.
- Uses file-based routing with Expo Router.

2. Components Directory:

- Contains reusable UI components and core components.
- UI components include themed text, views, icons, and more.

3. Constants Directory:

- Contains application-wide constants such as colors.

4. Hooks Directory:

- Contains custom hooks for theme management and other functionalities.

5. Services Directory:

- Contains API service definitions using Redux Toolkit Query.

6. Store Directory:

- Contains Redux store configuration, slices, and selectors.
- Uses redux-persist for persisting user preferences.

## Technologies Used
- React Native: For building the mobile application.
- Expo: For development and build tools, and routing (expo-router).
- Redux Toolkit: For state management.
- Redux Persist: For persisting Redux state.
