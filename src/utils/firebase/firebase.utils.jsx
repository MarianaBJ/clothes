import { async } from '@firebase/util';
import { initializeApp } from 'firebase/app'
import{getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword} from 'firebase/auth'

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDHkbC3GAAEB4wB00P0rsNT6c22qVEEDf0",
    authDomain: "crwn-clothing-db-16990.firebaseapp.com",
    projectId: "crwn-clothing-db-16990",
    storageBucket: "crwn-clothing-db-16990.appspot.com",
    messagingSenderId: "953006088819",
    appId: "1:953006088819:web:32dbf079898c99c51a4006"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, addtionalInformation={})=>{
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth
        const createAt = new Date()

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createAt,
                ...addtionalInformation
            })
        }catch(error){
            console.log(error.message)
        }
    }
    return userDocRef
}


export const createAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password)
}


export const sigInAuthUserWithEmailAndPassword = async(email, password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password)
}