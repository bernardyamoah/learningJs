 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
 import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js";
import { getStorage,ref } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";
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
 const storage = getStorage(app);
var imgName,imgUrl;
var files=[]
var reader


var FileInput = document.getElementById('file_input')


FileInput.onchange=e=>{
    // e.preventDefault();
    files=e.target.files;
    reader=new FileReader();

        reader.onload=function(){
        document.getElementById('myProfile').classList.toggle('hidden')
        document.getElementById('myProfile').src = reader.result
    },
    
        reader.readAsDataURL(files[0])
}
FileInput.click()


document.getElementById('upload').onclick=function(){
    
    imgName = document.getElementById('file_input').value;
    var uploadTask = ref(storage, 'Images/'+ imgName +".png").put(files[0]);
    // Upload Progress
    uploadTask.on('state_changed', function(snapshot){
        document.getElemendById('progressWrapper').classList.toggle('hidden')
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        
        document.getElementById('progress').innerHTML = progress + "%";
        document.getElementById('fileTransferProgress').style.width=`${progress}%`;
    }),
    (error) => {
      console.log(error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        imgUrl = downloadURL;
        const picturesRef = db.collection("Pictures").doc(imgName);
        picturesRef.set({
          Name: imgName,
          Url: imgUrl,
        })
        .then(() => {
          console.log("Image successfully added.");
        })
        .catch((error) => {
          console.log(error);
        });
      });
    }
    
    
}
