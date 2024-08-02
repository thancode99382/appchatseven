// import { useEffect, useState } from "react";
// import { collection, onSnapshot, query, where } from "firebase/firestore";
// import { db } from "../firebase/config";
// const useFireStore = (collectionName, condition) => {
//   const [documents, setDocuments] = useState([]);

//   useEffect(() => {
//     let collectionRef = collection(db, collectionName);

//     if (condition) {
    

//       if (!condition.compareValue || !condition.compareValue.length) {
//         return;
//       }

//       collectionRef = query(
//         collectionRef,
//         where(condition.fieldName, condition.operator, condition.compareValue)
//       );
//     }

//     onSnapshot(collectionRef, (snapshot) => {
//       const documents = snapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));
      
//       setDocuments(documents);
//     });
//   }, [collectionName, condition]);

//   return documents
// };

// export default useFireStore;


import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

const useFireStore = (collectionName, condition) => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    let collectionRef = collection(db, collectionName);

    if (condition) {
      const { fieldName, operator, compareValue } = condition;

      // Handle case where compareValue might be null or undefined
      if (!compareValue || (Array.isArray(compareValue) && compareValue.length === 0)) {
        return;
      }

      collectionRef = query(
        collectionRef,
        where(fieldName, operator, compareValue)
      );
    }

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setDocuments(docs);
    });

    // Cleanup function to unsubscribe from Firestore updates
    return () => unsubscribe();
  }, [collectionName, condition]);

  return documents;
};

export default useFireStore;
