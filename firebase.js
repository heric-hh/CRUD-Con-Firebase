// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Crear las funciones para interactuar con Firebase
import {
  getFirestore,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  collection,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {
  getStorage, ref, uploadBytes,
  uploadBytesResumable, getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa86hnrVg5BvrUqVFFII52nyamFPwuhN4",
  authDomain: "fir-js-crud-f0108.firebaseapp.com",
  projectId: "fir-js-crud-f0108",
  storageBucket: "fir-js-crud-f0108.appspot.com",
  messagingSenderId: "44019118882",
  appId: "1:44019118882:web:63f4ba298871e6528cab7b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Conexion a la base de datos
const db = getFirestore();

const storage = getStorage();


// Guardar tarea
export const saveTask = (title, description, imageUrl) => {
  addDoc(collection(db, 'tasks'), { title, description, imageUrl });
}

// Obtener Tareas
export const getTasks = () => getDocs(collection(db, 'tasks'));

// Mostrar tareas sin recargar
export const onGetTask = (callback) => onSnapshot(collection(db, 'tasks'), callback);

export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

export const getTask = id => getDoc(doc(db, 'tasks', id));

export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id), newFields);

export const saveImage = file => {
  console.log(file);
  const storageRef = ref(storage, `images/${file.name}`);

  const uploadTask = uploadBytesResumable(storageRef, file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      document.querySelector( '#progress' ).value = 'Upload is ' + progress + '% done';
      
    },
    (error) => {
      // Handle unsuccessful uploads
    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        //document.querySelector( '#progress' ).value = 'Fin';
        document.querySelector(  )
        console.log('File available at', downloadURL);
      });
    }
  );


}