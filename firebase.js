import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyCECoxYRp4k1V1PNlSiSp0XgkN5eB8wJ40",
    authDomain: "weed-e4552.firebaseapp.com",
    projectId: "weed-e4552",
    storageBucket: "weed-e4552.appspot.com",
    messagingSenderId: "915327604976",
    appId: "1:915327604976:web:7afa6bb2e717d783e0ca35",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);