// firebase-config.js
// Single source of truth for Firebase configuration.
// Import this in every page instead of copy-pasting the config object.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey:            "AIzaSyDHhI7-MyJS3LpHuNZWhGcp0_heKMAxQpo",
  authDomain:        "edusupply-b92ad.firebaseapp.com",
  projectId:         "edusupply-b92ad",
  storageBucket:     "edusupply-b92ad.firebasestorage.app",
  messagingSenderId: "993801689755",
  appId:             "1:993801689755:web:54ded7be82b4583fc2043e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db   = getFirestore(app);
