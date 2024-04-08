import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadImage = async (file) => {
  const storage = getStorage();
  const storageRef = ref(storage, 'restaurant_images/' + file.name);
  const uploadTask = uploadBytes(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on('state_changed',
      (snapshot) => {
      },
      (error) => {
        console.error('Error uploading image:', error);
        reject('Error uploading image. Please try again.');
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
