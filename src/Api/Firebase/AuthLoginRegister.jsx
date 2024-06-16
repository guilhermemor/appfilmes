import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from 'firebase/auth';

import { useState, useEffect } from 'react';
import { auth } from '../../firebase/config';


export const AuthLoginRegister = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };

    const createUser = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError('');

        try {
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, {
                displayName: data.name,
            });

            setLoading(false);
            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErroMessage;
            if (error.message.includes("auth/email-already-in-use")) {
                systemErroMessage = "Email já cadastrado.";
            } else if (error.message.includes("Password should be at least")) {
                systemErroMessage = "A senha precisa ter no mínimo 6 caracteres.";
            } else {
                systemErroMessage = "Ocorreu um erro, tente novamente mais tarde.";
            }
            setLoading(false);
            setError(systemErroMessage);
        }
    };

    // Logout
    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    };

    // Login
    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErroMessage;
            if (error.message.includes("auth/invalid-credential")) {
                systemErroMessage = "Usuário e senha não existem";
            } else {
                systemErroMessage = "Ocorreu um erro, tente mais tarde";
            }
            setLoading(false);
            setError(systemErroMessage);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login,
    };
};
