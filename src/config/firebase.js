// COnfiguracion e inicializacion de la base de datos
import { initializeApp } from "firebase/app";
// Referencia a la base de datos
import { getFirestore } from "firebase/firestore";
// Referencia al paquete de autenticacion
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
// Metodos de interaccion con la base de datos
import {
  addDoc,
  collection,
  getDocs,
  query,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

//Llave unica para conectarse al proyecto en firebase
const firebaseConfig = {
  apiKey: "AIzaSyA12E98UfraYKcCFxIoC8QyRooXnlumn1A",
  authDomain: "ciclo3misiontic-b9088.firebaseapp.com",
  projectId: "ciclo3misiontic-b9088",
  storageBucket: "ciclo3misiontic-b9088.appspot.com",
  messagingSenderId: "953197985528",
  appId: "1:953197985528:web:8e5b859b8f4e488dd4050d",
  measurementId: "G-QYRQFL4T7G",
};

//Inicializacion
initializeApp(firebaseConfig);
const database = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
export let usuario;

//Login con Google
export const loginConGoogle = async () => {
  try {
    const respuesta = await signInWithPopup(auth, provider);
    usuario = respuesta.user;
    console.log(usuario);
  } catch (error) {
    throw new Error(error);
  }
};
//Creacion usuarios
export const crearUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = {
      id: credencialesUsuario.user.uid,
      email: credencialesUsuario.user.email,
    };
    //guardarDatabase('datos-usuarios', user)
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

//Login usuarios
export const loginUsuario = async (email, password) => {
  try {
    const credencialesUsuario = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // console.log(credencialesUsuario);
    // console.log(credencialesUsuario.user);
    // console.log(credencialesUsuario.user.uid);
    // const user = {
    //   id: credencialesUsuario.user.uid,
    //   email: credencialesUsuario.user.email
    // }
    // usuario = user

    return credencialesUsuario.user;
  } catch (e) {
    throw new Error(e);
  }
};

// LogOut -> salir
export const logOutUsuario = async () => {
  try {
    const respuesta = await signOut(auth);
    //console.log(respuesta);
    console.log("Me sali...!");
  } catch (e) {
    throw new Error(e);
  }
};

// Usuario Activo
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuario = user;
    console.log("El usuario logueado");
  } else {
    console.log("El usuario ya no esta logueado");
    usuario = undefined;
  }
});

//Database

//Consultar todos los servicios
<<<<<<< HEAD
export const consultarDatabaseServicios = async (nombreColeccion) =>{
    try {
        const respuesta = await getDocs(query(collection(database, nombreColeccion)))
        // console.log(respuesta);
    
        const coleccionDatos = respuesta.docs.map((documento) => {
           //console.log(documento);
           //console.log(documento.data());
          const documentoTemporal = {
            id: documento.id,
            ...documento.data()
          }
           //console.log(documentoTemporal);
          return documentoTemporal
        })
    
        return coleccionDatos
    } catch (error) {
        throw new Error(error)
    }
}
=======
export const consultarDatabaseServicios = async (nombreColeccion) => {
  try {
    const respuesta = await getDocs(
      query(collection(database, nombreColeccion))
    );
    // console.log(respuesta);

    const coleccionDatos = respuesta.docs.map((documento) => {
      //console.log(documento);
      //console.log(documento.data());
      const documentoTemporal = {
        id: documento.id,
        ...documento.data(),
      };
      console.log(documentoTemporal);
      return documentoTemporal;
    });

    return coleccionDatos;
  } catch (error) {
    throw new Error(error);
  }
};
>>>>>>> daniel

//Consultar todos los servicios del usuario
export const consultarDatabaseServiciosUsuario = async (
  nombreColeccion,
  usr
) => {
  try {
    const DBServicios = collection(database, nombreColeccion);
    const q = query(DBServicios, where("user", "==", usr));
    const respuesta = await getDocs(q);
    //const respuesta = await getDocs(query(collection(database, nombreColeccion)), where("user", "==", "corredor.jose@fuac.edu.co"))
    // console.log(respuesta);

    const coleccionDatos = respuesta.docs.map((documento) => {
      // console.log(documento);
      //console.log(documento.data());
      const documentoTemporal = {
        id: documento.id,
        ...documento.data(),
      };
      // console.log(documentoTemporal);
      return documentoTemporal;
    });

    return coleccionDatos;
  } catch (error) {
    throw new Error(error);
  }
};

//Consultar Servicio en particular
export const consultarServicioParticularUsuario = async (
  nombreColeccion,
  idServicio
) => {
  try {
    const DBServicios = doc(database, nombreColeccion, idServicio);
    const docSnap = await getDoc(DBServicios);

    const documentoTemporal = {
      id: docSnap.id,
      ...docSnap.data(),
    };
    console.log(documentoTemporal);
    return documentoTemporal;
  } catch (error) {
    throw new Error(error);
  }
};

//Anadir servicio
export const guardarNuevoServicio = async (nombreColeccion, data) => {
<<<<<<< HEAD
    try {
        const respuesta = await addDoc(collection(database, nombreColeccion), data)
        console.log(respuesta);
    } catch (error) {
        throw new Error(error)
    }
}
=======
  try {
    const respuesta = await addDoc(collection(database, nombreColeccion, data));
    console.log(respuesta);
  } catch (error) {
    throw new Error(error);
  }
};
>>>>>>> daniel

//Editar un Servicio
export const editarUnServicio = async (nombreColeccion, id, data) => {
  try {
    const respuesta = await updateDoc(doc(database, nombreColeccion, id), data);
  } catch (error) {
    throw new Error(error);
  }
};

//Eliminacion Servicio
export const eliminarUnServicio = async (nombreColeccion, id) => {
<<<<<<< HEAD
    try {
        const respuesta = await deleteDoc(doc(database, nombreColeccion, id))
        console.log(respuesta);
    } catch (error) {
        throw new Error(error)
    }
}

//Consultar Developers
export const consultarDevelopers = async (nombreColeccion) => {
    try {
        const respuesta = await getDocs(query(collection(database, nombreColeccion)))
        // console.log(respuesta);

        const coleccionDatos = respuesta.docs.map((documento) => {
            //console.log(documento);
            //console.log(documento.data());
            const documentoTemporal = {
                id: documento.id,
                ...documento.data()
            }
            console.log(documentoTemporal);
            return documentoTemporal
        })

        return coleccionDatos
    } catch (error) {
        throw new Error(error)
    }
}

//Eliminar Developer
export const eliminarUnDeveloper = async (nombreColeccion, id) => {
    try {
        const respuesta = await deleteDoc(doc(database, nombreColeccion, id))
        console.log(respuesta);
    } catch (error) {
        throw new Error(error)
    }
}

//Consultar todos los tipos identificación
export const consultarDatabaseTipoIdentificacion = async (nombreColeccion) =>{
    try {
        const respuesta = await getDocs(query(collection(database, nombreColeccion)))
        // console.log(respuesta);
    
        const coleccionDatos = respuesta.docs.map((documento) => {
           //console.log(documento);
           //console.log(documento.data());
          const documentoTemporal = {
            id: documento.id,
            ...documento.data()
          }
           console.log(documentoTemporal);
          return documentoTemporal
        })
    
        return coleccionDatos
    } catch (error) {
        throw new Error(error)
    }
}

//Finalizacion CRUD

=======
  try {
    const respuesta = await deleteDoc(doc(database, nombreColeccion, id));
    console.log(respuesta);
  } catch (error) {
    throw new Error(error);
  }
};
>>>>>>> daniel
