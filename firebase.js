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

// Guardar tarea
export const saveTask = ( title, description ) => {
    addDoc ( collection ( db, 'tasks' ), { title, description } );
}  

// Obtener Tareas
export const getTasks = () => getDocs ( collection ( db, 'tasks' ) );

// Mostrar tareas sin recargar
export const onGetTask = ( callback ) => onSnapshot ( collection ( db, 'tasks' ), callback );

export const deleteTask = id => deleteDoc ( doc ( db, 'tasks', id ) );

export const getTask = id => getDoc ( doc ( db, 'tasks' , id ) );

export const updateTask = ( id, newFields ) => updateDoc ( doc ( db, 'tasks', id ), newFields );
