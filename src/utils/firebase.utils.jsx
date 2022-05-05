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
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCI92ZV0uzF6htPOadNVRwBNrFkt-yQRXY",
    authDomain: "crown-clothing-a9bef.firebaseapp.com",
    projectId: "crown-clothing-a9bef",
    storageBucket: "crown-clothing-a9bef.appspot.com",
    messagingSenderId: "579117383806",
    appId: "1:579117383806:web:f031ec43b4bbdf108f982f"
};
// Initialize Firebase with above config
//initializeApp : creates an app instance for you based on some type of config..configi's an object that
//allows us to attach this firebase instance to that instance we have online
//setDoc setting the document data
//getDoc getting the document data
//doc get document instance
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

export const addCollectionAndDocuments = async(collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    });
    await batch.commit()
    console.log('done')
}

export const getCategoriesAndDocuments = async() => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(docSnapshot => docSnapshot.data())
}

export const createUserDocumentFromAuth = async(userAuth, additionalInformation) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

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
    return userSnapShot;
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

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (userAuth) => {
                unsubscribe();
                resolve(userAuth);
            },
            reject
        )
    })
}