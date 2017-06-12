// @flow

import firebase from "firebase";

export const readFile = (file: Object, callback: Function) => {
  const reader = new FileReader();

  reader.onload = () => callback(reader.result);

  reader.readAsDataURL(file);
};

export const handleImageUpload = (imageFile: Object) => {
  return new Promise((resolve, reject) => {
    if (imageFile) {
      const storageRef = firebase
        .storage()
        .ref(`/beer-images/${imageFile.name}`);
      const uploadProcess = storageRef.put(imageFile);

      uploadProcess.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
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
    } else {
      resolve("");
    }
  });
};

export const handleBatchImageUpload = (imageFiles: Array<Object>) => {
  const uploadProcesses = imageFiles.map(imageFile =>
    handleImageUpload(imageFile)
  );
  return Promise.all(uploadProcesses);
};
