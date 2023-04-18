 // Import the functions you need from the SDKs you need

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-firestore.js';
import { getStorage, ref } from 'https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js';

const firebaseConfig = {
  // Your web app's Firebase configuration
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

let files = [];
let reader;

const submitBtn = document.getElementById('submitBtn');
const fileInput = document.getElementById('file_input');
var myProfileImg = document.getElementById('myProfile');
const fileTransferProgress = document.getElementById('fileTransferProgress');

fileInput.onchange = (e) => {
  files = e.target.files;
  reader = new FileReader();

  reader.onload = function () {
    myProfileImg.src = reader.result;
  };

  reader.readAsDataURL(files[0]);
};

fileInput.click();

function uploadImage() {
  const imgName = fileInput.value;
  const uploadTask = storage.ref(`Images/${imgName}.png`).put(files[0]);

  uploadTask.on(
    'state_changed',
    function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      fileTransferProgress.style.width = `${progress}%`;
    },
    function (error) {
      console.log(error);
    },
    function () {
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        const imgUrl = downloadURL;
        console.log(imgUrl);

        const picturesRef = db.collection('Pictures');
        picturesRef
          .doc(imgName)
          .set({
            Name: imgName,
            Url: imgUrl,
          })
          .then(() => {
            iziToast.success({
              title: 'Success',
              message: 'Image successfully added',
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  );
}

submitBtn.addEventListener('click', uploadImage);
