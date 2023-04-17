 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import {
    getFirestore,doc,getDoc,collection,updateDoc,addDoc,deleteDoc,getDocs
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyASJLuDG5jhvDiaJ-GQ-keLR2Xhy2wNI-o",
    authDomain: "mydemo-9802c.firebaseapp.com",
    databaseURL: "https://mydemo-9802c-default-rtdb.firebaseio.com",
    projectId: "mydemo-9802c",
    storageBucket: "mydemo-9802c.appspot.com",
    messagingSenderId: "636147442459",
    appId: "1:636147442459:web:42dd3e3c25c62167fc29be"

 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const db=getFirestore(app)

// References
const first_name=document.getElementById('first_name');
const last_name=document.getElementById('last_name');
const email=document.getElementById('email');

const phone=document.getElementById('phone');
const website=document.getElementById('website');


// Buttons
const submitBtn=document.getElementById('submitBtn');
const btnUpdate=document.getElementById('updBtn');
const delBtn=document.getElementById('delBtn');
const selBtn=document.getElementById('selBtn');

// Get data from Firestore
async function getDataFromFirestore() {
    const querySnapshot = await getDocs(collection(db, "your_collection_name"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  }



async function AddDocument(){
    try{
        var ref = collection(db, 'Persons')
    const docRef= await addDoc(
        ref,{
            Firstname:first_name.value,
            Lastname:last_name.value,
            Email:email.value,
            Phone:phone.value,
            Website:website.value

        }
    )
    .then(()=>{
        iziToast.success({
            title: 'Success',
            message: 'Document successfully added',
        });
    })
    }
    catch(error){
        iziToast.error({
            title: error,
            message: 'Document unsuccessfully due to ' + error,
        });
    }
    
}

// Get Document
async function GetDocument(){
    try{
        var ref = doc(db, 'Persons',first_name.value || email.value || last_name.value || phone)
    const docSnap= await getDoc(ref)
    .then((docSnap)=>{
        if(docSnap .exists()){
            first_name.value=docSnap.data().Name
            last_name.value=docSnap.data().Lastname
            email.value=docSnap.data().Email
        
            phone.value=docSnap.data().Phone
            website.value=docSnap.data().Website

            iziToast.success({
                title: 'Success',
                message: 'Document successfully added',
            });
            
        }
        
        else{
            iziToast.error({
                title: error,
                message: 'Document does not exist ',
            });
        }
    })
    }
    catch(error){
        iziToast.error({
            title: error,
            message: 'Document does not exist ',
        });
    }
}
// Update Fields
async function UpdateFieldsInaDocument(){
    try{
        var ref = doc(db, 'Persons', email.value || first_name.value || last_name.value || phone.value || website)
    await updateDoc(ref,{
        Firstname:first_name.value,
        theme: 'dark',
        Lastname:last_name.value,
        Email:email.value,
        Phone:phone.value,
        Website:website.value
    })
    .then(()=>{
        iziToast.info({
            title: 'Update',    
            message: 'Document successfully updated ',
        });
    })
    }
    
    catch(error){
        iziToast.warning({
            title: error,            
            message: 'Updating unsucessful ',    
        });
    }
}
// Delete Document
async function deleteDocument()
{
    try{
        var ref = doc(db, 'Persons', email.value || first_name.value || last_name.value  || phone)
    const docSnap= await getDoc(ref)
    if(!docSnap.exists()){
        iziToast.warning({
            title: error,
            message: 'Document does not exist ',
            
        });
        return
    }
    await deleteDoc(ref)
    .then(()=>{
        iziToast.success({
            title: 'Success',
            message: 'Document deleted successfully ',
            
        });
    })
    
    }
    catch(error){
        iziToast.error({
            title: error,
            message: 'Document unsuccessfully due to ' + error,
            
        });
    }
}


// Assign Events to Buttons
submitBtn.addEventListener('click', AddDocument)
selBtn.addEventListener('click', GetDocument)
btnUpdate.addEventListener('click', UpdateFieldsInaDocument)
delBtn.addEventListener('click', deleteDocument)
// Toast notifications
iziToast.settings({
    theme: "dark",
    timeout: 5000,
    overlay: true,
    position:'center',
    progressBarColor: 'rgb(0, 255, 184)',
    resetOnHover: true,
    transitionIn: 'bounceInDown',
    transitionOut: 'fadeOutUp',
    pauseOnHover: true,
    overlayColor: 'rgba(0, 0, 0, 0.6)',
    balloon: true,
    });

