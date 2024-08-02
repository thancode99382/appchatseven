import { createContext, useEffect, useMemo, useState } from "react";
import useFireStore from "../hook/useFireStore";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isAddUserRoomVisible, setIsAddUserRoomVisible] = useState(false);
  const [roomselect, setRoomSelect] = useState(null);
  const fetchUsers = useFireStore("users");
  const fetchRooms = useFireStore("rooms");
  const [usersRoom ,setUsersRoom] = useState()
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
  console.log(users);
  console.log(rooms);
  console.log(roomselect);
  console.log(usersRoom);
  // console.log(members);
  return (
    <AppContext.Provider
      value={{
        rooms,
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
