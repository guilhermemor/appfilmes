
import { useState, useEffect } from 'react';
import { addDoc} from 'firebase/firestore';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const AuthAddRemoveFav = () => {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [cancelled, setCancelled] = useState(false);

    const checkIfIsCancelled = () => {
        if (cancelled) {
            return;
        }
    };

        const addFav = async (data,cole) => {
            console.log(cole)
            checkIfIsCancelled();
            setLoading(true);
            setError('');
            try {
     
            const collectionRef = collection(db, cole);

            const docRef = await addDoc(collectionRef, data);
        
            } catch (error) {
            setError('Erro ao adicionar dados ao BD, Tente mais tarde:', error);
            console.log(error)
            return
            }
            setLoading(false);
        };
    

        const deleteFav = async (collectionName, data) => {
            setError('');
        
            try {
                const collectionRef = collection(db, collectionName);

                const q = query(collectionRef, where('idUser', '==', data.idUser), where('id', '==', data.id));
                
                const querySnapshot = await getDocs(q);
        
                if (!querySnapshot.empty) {
                    const docSnapshot = querySnapshot.docs[0]; // Pegamos o primeiro documento
                    const documentId = docSnapshot.id;
                    const documentRef = doc(collectionRef, documentId);
        
                    // Exclua o documento
                    await deleteDoc(documentRef);
        
                } else {
                    setError('Nenhum documento encontrado com os critérios fornecidos');
                }
            } catch (error) { 
                console.log("Erro ao excluir o documento:" + error);
                setError("Erro ao excluir o documento:" + error);
                return;
            }
        
            setLoading(false);
        };
        
        useEffect(() => {
            return () => setCancelled(true);
        }, []);
        
     return {addFav,deleteFav,error, loading}   
}