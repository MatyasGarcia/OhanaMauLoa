import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_apiKey,
    authDomain: import.meta.env.VITE_authDomain,
    projectId: import.meta.env.VITE_projectId,
    storageBucket: import.meta.env.VITE_storageBucket,
    messagingSenderId: import.meta.env.VITE_messagingSenderId,
    appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export async function loginEmailPass(email, password) {
    const credenciales = await signInWithEmailAndPassword(auth, email, password);
    const uid = credenciales.user.uid;
    const docSnap = await getDoc(doc(db, "usuarios", uid));
    if (docSnap.exists()) {
        return {
            email: email,
            rol: docSnap.data().rol,
        };
    } else {
        throw new Error("No se encontró información del usuario");
    }
}

export { app, auth, db };