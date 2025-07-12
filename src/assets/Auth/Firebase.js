import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB0aIGjCrwtOUo_kRwyhQ2H6-F0pY4NpN0",
    authDomain: "ohanamauloa-6a7e0.firebaseapp.com",
    projectId: "ohanamauloa-6a7e0",
    storageBucket: "ohanamauloa-6a7e0.appspot.com",
    messagingSenderId: "286111918922",
    appId: "1:286111918922:web:dc3b2ac055f19d87e6efb3"
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