import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithRedirect, // this will redirect to google page 
    signInWithPopup, //open pop up for log in
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCI92ZV0uzF6htPOadNVRwBNrFkt-yQRXY",
    authDomain: "crown-clothing-a9bef.firebaseapp.com",
    projectId: "crown-clothing-a9bef",
    storageBucket: "crown-clothing-a9bef.appspot.com",
    messagingSenderId: "579117383806",
    appId: "1:579117383806:web:f031ec43b4bbdf108f982f"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();

// So, if you want the user to be able to choose from multiple Google accounts that they might have (instead of just the primary account), you should include this parameter.
googleProvider.setCustomParameters({
    prompt: "select_account"
});
// GetAuth. FirebaseAuth GetAuth( FirebaseApp app. ) Returns the FirebaseAuth object for an App
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef);
    const userSnapShot = await getDoc(userDocRef);
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password)
}
export const signOutUser = async() => await signOut(auth)
export const onAuthStateChangedListner = (callback) => onAuthStateChanged(auth, callback)