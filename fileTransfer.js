import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
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
 const db = getFirestore(app);
 const storage = getStorage(app);
 const FileInput = document.getElementById('file_input');
 
 const fileTransferProgress = document.getElementById('fileTransferProgress');
 const progressValue=document.getElementById('progressValue')
 const uploadButton = document.getElementById('upload');
 let files = [];
 let reader;
 

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


uploadButton.addEventListener('click', async () => {
  try {
    const imgName = FileInput.value;
    const fileRef = ref(storage, `Images/${imgName}.png`);
    const uploadTask = uploadBytesResumable(fileRef, files[0]);
    // const progressWrapper = document.getElementById('progress');
    let progress;

    uploadTask.on('state_changed', (snapshot) => {
      progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progressValue.innerText=progress.toFixed(2) + "%";
      fileTransferProgress.style.width = `${progress.toFixed(2)}%`;
    }, (error) => {
      console.log(error);
    }, () => {
      fileRef.getDownloadURL().then((downloadURL) => {
        imgUrl = downloadURL;
        const fileDocRef = doc(db, 'files', 'file-id');
        setDoc(fileDocRef, {
          Name: imgName,
          Url: imgUrl,
        })
        .then(() => {
          console.log('Image successfully added.');
        })
        .catch((error) => {
          console.log(error);
        });
      });
    });
  } catch (err) {
    console.log(err);
  }
});
