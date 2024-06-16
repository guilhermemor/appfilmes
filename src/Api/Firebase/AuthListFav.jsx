import {  useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

export const AuthListFav = (coletiondb) => {
  
    const [dataList, setDataList] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
         
        const fetchData = async (cole) => {
            setLoading(true)
            try {
                const collectionRef = collection(db, cole); 
                const q = query(collectionRef); 

                const querySnapshot = await getDocs(q);

                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDataList(data);
                return dataList
            } catch (error) {
                setError(error);
                return
            } finally {
                setLoading(false);
            }
        
        };
        fetchData(coletiondb);
        
    }, [coletiondb]);
    return {dataList,loading,error}
}


