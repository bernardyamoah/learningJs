 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import {
    getFirestore,doc,collection,updateDoc,addDoc,deleteDoc,getDoc
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getStorage,ref, uploadBytesResumable} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
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


//  File input Reference
 const storage = getStorage(app);
 const fileInput = document.getElementById('file_input');
 const fileTransferProgress = document.getElementById('fileTransferProgress');
 const progressValue=document.getElementById('progressValue')
 const myProfile = document.getElementById('myProfile');
 let files = [];
 let reader;
 
 // References
const first_name=document.getElementById('first_name');
const last_name=document.getElementById('last_name');
const email=document.getElementById('email');




// Buttons
const submitBtn=document.getElementById('submitBtn');
const btnUpdate=document.getElementById('updBtn');
const delBtn=document.getElementById('delBtn');
const selBtn=document.getElementById('selBtn');


// File Input
fileInput.addEventListener('change', function() {
    files = this.files;
    reader = new FileReader();
  
    reader.onload = function() {
    
    myProfile.classList.remove('hidden');
    myProfile.src = reader.result;
     
    };
  
    reader.readAsDataURL(files[0]);
  });
fileInput.click();


// Upload file
const uploadFile = async () => {
    try {
      const fileName = fileInput.files[0].name.split('\\').pop();
      console.log('Selected file:', fileName);
      const fileRef = ref(storage, `Images/${email.value}/${fileName}`);
      const uploadTask = uploadBytesResumable(fileRef, fileInput.files[0]);
      const progressWrapper = document.getElementById('progressWrapper');
      progressWrapper.classList.toggle('hidden');
      let progress;
      
  
      uploadTask.on('state_changed', function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        progress = (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(0) * 100;
        progressValue.innerText = `${progress}%`;
        fileTransferProgress.style.width = `${progress}%`;
      });
      await uploadTask;
      progressWrapper.classList.toggle('hidden');
      iziToast.success({
      title: 'Success',
      message: 'Document successfully added',
    });
    resetInputs()
    progressWrapper.classList.toggle('hidden');
    } catch (err) {
        if (!uploadFile.hasShownError) { // check if an error toast has already been shown
            uploadFile.hasShownError = true; // set flag to true
            iziToast.error({
              title: "Error",
              message: "Upload unsuccessfully due to " + err,
            });
          }
    }
  };

//   Add Document
const addDocument = async () => {
    try {
      // Validate input fields
      // if (!validateInputs()) {
      //     return;}
      const ref = collection(db, 'Persons');
      const docRef = await addDoc(ref, {
        Firstname: first_name.value,
        Lastname: last_name.value,
        Email: email.value,
    
        
      });
  
      await uploadFile();
    } catch (error) {
        if (!AddDocument.hasShownError) { // check if an error toast has already been shown
            AddDocument.hasShownError = true; // set flag to true
            iziToast.error({
              title: "Error",
              message: `Document unsuccessfully due to ${error}`,
            });
          }
    }
  };
// Validate input fields
function validateInputs() {
    if (first_name.value.trim() === '') {
    iziToast.warning({
    title: 'Warning',
    message: 'Please enter first name',
    });
    return false;
    }
    if (last_name.value.trim() === '') {
    iziToast.warning({
    title: 'Warning',
    message: 'Please enter last name',
    });
    return false;
    }
    if (email.value.trim() === '') {
    iziToast.warning({
    title: 'Warning',
    message: 'Please enter email',
    });
    return false;
    }
    
    if (fileInput.value.trim() === '') {
    return true;
    }
    return false;
}
    
// Reset input fields
function resetInputs() {
    first_name.value = '';
    last_name.value = '';
    email.value = '';
    fileInput.value ='' ;
    fileTransferProgress.value = '';
    progressValue.value=''
    progressValue.innerText=''
    files=[]
    myProfile.src = ''
    myProfile.classList.toggle('hidden')


    console.log('done reseting')
    progressWrapper.classList.toggle('hidden')
    }
// Get data from Firestore






// Get Document
async function GetDocument() {
    try {
    // Get document reference based on the input fields
    const ref = getDoc(
    db,
    'Persons',
    email.value || first_name.value || last_name.value 
    );
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        // Populate input fields with document data
        first_name.value = docSnap.data().Firstname;
        last_name.value = docSnap.data().Lastname;
        email.value = docSnap.data().Email;
        // myProfile.src = docSnap.data().ProfileImage;
        

        iziToast.success({
            title: 'Success',
            message: 'Document successfully retrieved',
        });
    } else {
        iziToast.warning({
            title: 'Warning',
            message: 'Document does not exist',
        });
    }
} catch (error) {
    iziToast.error({
        title: 'Error',
        message: 'Document unsuccessfully due to ' + error,
    });
}
}




// Update Fields
async function UpdateFieldsInaDocument(){
    try{
        var ref = doc(db, 'Persons', email.value || first_name.value || last_name.value )
    await updateDoc(ref,{
        Firstname:first_name.value,
        theme: 'dark',
        Lastname:last_name.value,
        Email:email.value,
        
    
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
        var ref = doc(db, 'Persons', email.value || first_name.value || last_name.value )
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
submitBtn.addEventListener('click', addDocument)
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





    // submit picture to storage

