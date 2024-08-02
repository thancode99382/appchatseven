import { createContext, useContext, useEffect, useMemo, useState } from "react";
import useFireStore from "../hook/useFireStore";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AuthContext } from "./AuthProvider";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isAddUserRoomVisible, setIsAddUserRoomVisible] = useState(false);
  const [roomselect, setRoomSelect] = useState(null);
  const fetchUsers = useFireStore("users");
  const fetchRooms = useFireStore("rooms");
  const user = useContext(AuthContext)
  const [usersRoom ,setUsersRoom] = useState()
  const [roomUser ,setRoomUser] = useState()
  // const usersCondition = useMemo(() => {
  //   if (!roomselect?.members || !roomselect.members.length===0) return null;
  //   return {
  //     fieldName: "uid",
  //     operation: "in",
  //     compareValue: roomselect.members,
  //   };
  // }, [roomselect]);

  // const members = useFireStore("users", usersCondition);
  
    
  

  useEffect(() => {
    if (!roomselect?.members || roomselect.members.length === 0) return;
   
    const collectionRef = query(
      collection(db, "users"),
      where("uid", "in", roomselect.members)
    );

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      let documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      console.log("Documents fetched:", documents); // Debug statement
      setUsersRoom(documents);
    });

    return () => unsubscribe();
  }, [roomselect]);
  
  
    


  const users = useMemo(() => fetchUsers, [fetchUsers]);
  const rooms = useMemo(() => fetchRooms, [fetchRooms]);
  
//   const roomsCondition = useMemo(() => {
//     if (!user.uid) return null;
//     return {
//       fieldName: "members",
//       operation: "array-contains",
//       compareValue: user.uid,
//     };
//   }, [user.uid]);
// const roomma = useFireStore("rooms", roomsCondition);
// console.log(roomma)


useEffect(() => {
  if (!user?.uid) return;
  const collectionRef = query(
    collection(db, "rooms"),
    where("members", "array-contains", user.uid)
  );

  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    let documents = snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("Documents fetched:", documents); // Debug statement
    setRoomUser(documents);
  });

  return () => unsubscribe();
}, [user?.uid,isAddUserRoomVisible]);
  
  console.log(users);
  console.log(rooms);
  console.log(roomselect);
  console.log(usersRoom);
  console.log({roomUser});

 
  return (
    <AppContext.Provider
      value={{
        roomUser,
        users,
        roomselect,
        setRoomSelect,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isAddUserRoomVisible,
        setIsAddUserRoomVisible,
        usersRoom
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
