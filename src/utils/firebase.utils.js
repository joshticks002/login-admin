import { initializeApp } from "firebase/app";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import {
    getDoc,
    setDoc,
    doc,
    getFirestore,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDUs--f-3I31y5jBV-xBeCfxFv2Me9Q43A",
    authDomain: "josh-market-db.firebaseapp.com",
    projectId: "josh-market-db",
    storageBucket: "josh-market-db.appspot.com",
    messagingSenderId: "835706510887",
    appId: "1:835706510887:web:02190adde5a3ca554bb802",
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const createUserDocFromAuth = async(userAuth, additionalInfo = {}) => {
    if (!userAuth) return;
    const docRef = doc(db, "users", userAuth.uid);

    const userSnapshot = await getDoc(docRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(docRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error) {
            console.log("Error creating user", error.message);
        }
    }

    return docRef;
};

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async() => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
    onAuthStateChanged(auth, callback);