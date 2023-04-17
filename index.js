 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyASJLuDG5jhvDiaJ-GQ-keLR2Xhy2wNI-o",
   authDomain: "mydemo-9802c.firebaseapp.com",
   projectId: "mydemo-9802c",
   storageBucket: "mydemo-9802c.appspot.com",
   messagingSenderId: "636147442459",
   appId: "1:636147442459:web:42dd3e3c25c62167fc29be"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

import {
    getFirestore,doc,getDoc,setDoc,collection,addDoc,updateDoc,deleteDoc,deleteField
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

const db=getFirestore()

// References
const nameBox=document.getElementById('Namebox');
const emailBox=document.getElementById('Emailbox');
const passwordBox=document.getElementById('Passwordbox');
const phoneBox=document.getElementById('Phonebox');


// Buttons
const submitBtn=document.getElementById('submitBtn');
const btnUpdate=document.getElementById('updBtn');




async function AddDocument(){
    var ref = collection (db, 'UserInfo')
    const docRef= await addDoc(
        ref,{
            Name:nameBox.value,
            Email:emailBox.value,
            Password:passwordBox.value,
            Phone:phoneBox.value
        }
    )
    .then(()=>{
        alert('Document successfully written!')
    })
    .catch((error)=>{
        alert('there was an error'+ error)
    })
}