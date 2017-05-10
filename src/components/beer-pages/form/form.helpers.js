// @flow

import firebase from 'firebase';

export const readFile = (file: Object, callback: Function) => {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);

  reader.readAsDataURL(file);
};

export const handleImageUpload = (imageFile: Object) => {
  return new Promise((resolve, reject) => {
    const file = imageFile;

    if (file) {
      const storageRef = firebase.storage().ref(`/beer-images/${file.name}`);
      const uploadProcess = storageRef.put(file);

      uploadProcess.on(firebase.storage.TaskEvent.STATE_CHANGED,
          snapshot => {
            // Uploading
            // let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            // TODO Handle error
            reject(error);
          },
          () => {
            // Upload is complete
            resolve(uploadProcess.snapshot.downloadURL);
          }
      );
    }

    else {
      resolve('');
    }
  });
};
