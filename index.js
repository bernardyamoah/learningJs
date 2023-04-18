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
 const FileInput = document.getElementById('file_input');
 const fileTransferProgress = document.getElementById('fileTransferProgress');
 const progressValue=document.getElementById('progressValue')
 
 let files = [];
 let reader;
 
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


// File Input
FileInput.addEventListener('change', function() {
    files = this.files;
    reader = new FileReader();
  
    reader.onload = function() {
      document.getElementById('myProfile').classList.toggle('hidden');
      document.getElementById('myProfile').src = reader.result;
     
    };
  
    reader.readAsDataURL(files[0]);
  });
FileInput.click();


// Upload file
function uploadfile() {
    try {
      var fileName = files[0].name.split('\\').pop();
      console.log('Selected file:', fileName);
      const fileRef = ref(storage, `Images/${email.value}/${fileName}.png`);
      const uploadTask = uploadBytesResumable(fileRef, files[0]);
      const progressWrapper = document.getElementById('progressWrapper');
      progressWrapper.classList.toggle('hidden')
      let progress;
  
      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed', (snapshot) => {
          progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          progressValue.innerText = progress.toFixed(0) + "%";
          console.log(progressValue.innerText = progress.toFixed(0) + "%")
          fileTransferProgress.style.width = `${progress.toFixed(0)}%`;
          if (progress === 100) {
            resolve();
          }
        }, (error) => {
          console.log(error);
          reject(error);
        }, () => {
          fileRef.getDownloadURL().then((url) => {
            console.log('File URL:', url);
            var imgUrl = url;
            const fileDocRef = doc(db, 'files', 'file-id');
            setDoc(fileDocRef, {
                Name: imgName,
                Url: imgUrl,
              })
              .then(() => {
                console.log('Image successfully added.');
                resetInputs()
              })
              .catch((error) => {
                console.log(error);
              });
          });
        });
      });
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
      

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
    if (phone.value.trim() === '') {
    iziToast.warning({
    title: 'Warning',
    message: 'Please enter phone number',
    });
    return false;
    }
    if (website.value.trim() === '') {
    iziToast.warning({
    title: 'Warning',
    message: 'Please enter website',
    });
    return false;
    }
    return true;
    }
    
// Reset input fields
function resetInputs() {
    first_name.value = '';
    last_name.value = '';
    email.value = '';
    phone.value = '';
    website.value = '';
    FileInput.value ='' ;
    fileTransferProgress.value = '';
    progressValue.value=''
    }
// Get data from Firestore




async function AddDocument(){
    try{
        // Validate input fields
// if (!validateInputs()) {
//     return;}
    var ref = collection(db, 'Persons')
    const docRef= await addDoc(
        ref,{
            Firstname:first_name.value,
            Lastname:last_name.value,
            Email:email.value,
            Phone:phone.value,
            Website:website.value,


        }
        
    )
    
    
    .then(()=>{
        uploadfile()
        
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
async function GetDocument() {
    try {
    // Get document reference based on the input fields
    const ref = doc(
    db,
    'Persons',
    email.value || first_name.value || last_name.value || phone.value
    );
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
        // Populate input fields with document data
        first_name.value = docSnap.data().Name;
        last_name.value = docSnap.data().Lastname;
        email.value = docSnap.data().Email;
        phone.value = docSnap.data().Phone;
        website.value = docSnap.data().Website;

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





    