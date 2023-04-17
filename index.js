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
const first_name=document.getElementById('first_name');
const last_name=document.getElementById('last_name');
const emailBox=document.getElementById('Emailbox');
const passwordBox=document.getElementById('Passwordbox');
const phone=document.getElementById('phone');
const website=document.getElementById('website');


// Buttons
const submitBtn=document.getElementById('submitBtn');
const btnUpdate=document.getElementById('updBtn');
const delBtn=document.getElementById('delBtn');
const selBtn=document.getElementById('selBtn');




async function AddDocument(){
    var ref = doc(db, 'UserInfo', emailBox.value)
    const docRef= await setDoc(
        ref,{
            Firstname:first_name.value,
            Lastname:last_name.value,
            Email:emailBox.value,
            Password:passwordBox.value,
            Phone:phone.value,
            Website:website.value

        }
    )
    .then(()=>{
        alert('Document successfully written!')
    })
    .catch((error)=>{
        alert('there was an error'+ error)
    })
}

// Get Document
async function GetDocument(){
    var ref = doc(db, 'UserInfo', emailBox.value || first_name.value || phone)
    const docSnap= await getDoc(ref)
    .then((docSnap)=>{
        if(docSnap .exists()){
            first_name.value=docSnap.data().Name
            last_name.value=docSnap.data().Lastname
            emailBox.value=docSnap.data().Email
            passwordBox.value=docSnap.data().Password
            phone.value=docSnap.data().Phone
            website.value=docSnap.data().Website

        }
        else{
            alert('No such document!')
        }
    })
    .catch((error)=>{
        alert(error)
    })
}
// Update Fields
async function UpdateFieldsInaDocument(){
    var ref = doc(db, 'UserInfo', emailBox.value || first_name.value || last_name.value || phone.value || website)
    await updateDoc(ref,{
        Firstname:first_name.value,
        Lastname:last_name.value,
        Email:emailBox.value,
        Password:passwordBox.value,
        Phone:phone.value,
        Website:website.value
    })
    .then(()=>{
        alert('Document successfully written!')
    })
    .catch((error)=>{
        alert('there was an error'+ error)
    })
}
// Delete Document
async function deleteDocument()
{
    var ref = doc(db, 'UserInfo', emailBox.value || first_name.value || phone)
    if(!docSnap.exists()){
        alert('Document does not exist')
        return
    }
    await deleteDoc(ref)
    .then(()=>{
        alert('Document deleted successfully!')
    })
    .catch((error)=>{
        alert('there was an error'+ error)
    })
    
}



// Assign Events to Buttons
submitBtn.addEventListener('click', AddDocument)
selBtn.addEventListener('click', GetDocument)
btnUpdate.addEventListener('click', UpdateFieldsInaDocument)
delBtn.addEventListener('click', deleteDocument)