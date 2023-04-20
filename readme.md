const addDocument = async () => {
  try {
    // Validate input fields
    // if (!validateInputs()) {
    //     return;}
    const personsRef = collection(db, 'Persons');
    const docRef = await addDoc(personsRef, {
      Firstname: first_name.value,
      Lastname: last_name.value,
      Email: email.value,
      Phone: phone.value,
      Website: website.value
    });

    // Upload file and get download URL
    const fileName = fileInput.files[0].name.split('\\').pop();
    const fileRef = ref(storage, `Images/${email.value}/${fileName}`);
    const uploadTask = uploadBytesResumable(fileRef, fileInput.files[0]);
    const snapshot = await uploadTask;
    const downloadURL = await snapshot.ref.getDownloadURL();

    // Add download URL to Firestore document
    await updateDoc(doc(db, 'Persons', docRef.id), { ImageURL: downloadURL });

    iziToast.success({
      title: 'Success',
      message: 'Document successfully added',
    });
  } catch (error) {
    if (!addDocument.hasShownError) {
      addDocument.hasShownError = true;
      iziToast.error({
        title: 'Error',
        message: `Document unsuccessfully due to ${error}`,
      });
    }
  }
};
