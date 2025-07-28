# Monopoly Bank

Monopoly Bank (fullstack React-based application) is a modern digital banking system designed for players of the classic board version of Monopoly. The app replaces physical cash with a fully electronic, real-time banking experience, ideal for players sitting together and managing in-game finances more efficiently.

Demo: [https://mb66.netlify.app/](https://mb66.netlify.app/)

# Features
With Monopoly Bank you can:

➡ Create games for 2–6 players with custom settings (start bonus, initial balance, currency: PLN, EUR, USD),

➡ Switch between Player and Bank tabs depending on your role,

➡ Send and receive money transfers between players,

➡ Request transfers from other players, with built-in notification support,

➡ Claim bonuses, pay taxes, or withdraw bank bonuses, just like in the physical game,

➡ Track all account balances in real time (thanks to Firebase Realtime Database),

➡ Allow other players to join a game via Game ID and individual player code, provided by the game owner,

➡ Manage permissions: Only the game creator has initial access to the Bank tab, but can extend this privilege to others.

# Used technologies and libraries
🔵 [Vite (React + TypeScript)](https://vite.dev/)

🔵 [NoSQL Google Firebase Realtime Database](https://firebase.google.com/docs/database)

🔵 [Material UI](https://mui.com/material-ui/getting-started/)

🔵 [React Router](https://reactrouter.com/)

🔵 [framer-motion](https://motion.dev/)

# Preview
![Monopoly Bank Preview (GIF)](https://github.com/hanz94/monopoly-bank/blob/db1f07d2aa78e7b0d8d8fda950e2ad38250ac68d/monopoly-bank.gif)

# How to install
Clone the repository and install npm dependencies
```bash
  git clone https://github.com/hanz94/monopoly-bank.git
  cd monopoly-bank
  npm install
```
Add file [firebaseConfig.tsx](https://github.com/hanz94/monopoly-bank/blob/0d1aba4e9e0fa7f1eb32cc85231d39bbc885ac6e/src/database/firebaseConfig.tsx) inside the /src/database/ with your Firebase Realtime Database configuration (Project Settings > Your Apps > SDK setup and configuration)
```bash
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; 
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "Your apiKey",
    authDomain: "Your authDomain",
    projectId: "Your projectId",
    storageBucket: "Your storageBucket",
    messagingSenderId: "Your messagingSenderId",
    appId: "Your appId",
    measurementId: "Your measurementId",
    databaseURL: "Your databaseURL"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app); // Optional: uncomment to enable analytics

export const db = getDatabase(app);
export const auth = getAuth(app);

```
 Start the Development Server (on http://localhost:5173)
```bash
  npm run dev
  // or
  vite
```
# Acknowledgements
- Arkadiusz Włodarczyk for inspiring courses on:
    - [JS, XML, jQuery, AJAX and RWD](https://www.udemy.com/course/kurs-tworzenia-stron-www-w-html-i-css-od-podstaw-do-eksperta/ )
    - [React Hooks, framer-motion, PWA](https://www.udemy.com/course/react-od-podstaw-do-eksperta/)

# License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/hanz94/monopoly-bank/blob/e5791559f69d82fa72a42791e57d116e0ef12abe/LICENSE) file for details.
