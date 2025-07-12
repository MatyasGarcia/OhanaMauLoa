import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, createUserWithEmailAndPassword} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc} from "firebase/firestore";
import { app } from '../assets/Auth/Firebase';

const AuthContext = createContext();
const auth = getAuth(app);
const db = getFirestore(app);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [rol, setRol] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const nuevoUsuario = userCredential.user;

    await setDoc(doc(db, "usuarios", nuevoUsuario.uid), {
        email: email,
        rol: "user"
    });
    setUser(nuevoUsuario);
};
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (usuarioFirebase) => {
        if (usuarioFirebase) {
            setUser(usuarioFirebase);
            const docRef = doc(db, "usuarios", usuarioFirebase.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                setRol(data.rol || "user");
                console.log("ROL DETECTADO:", data.rol);
            } else {
                setRol("user");
            }
        } else {
            setUser(null);
            setRol(null);
        }
        setLoading(false);
    });
    return () => unsubscribe();
}, []);

    const login = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setUser(userCredential.user);
    };
    const logout = () => {
        setUser(null);
        setRol(null);
        auth.signOut();
    };
    return (
        <AuthContext.Provider value={{ user, rol, login, logout, register, loading }}>
        {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);
