import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ImageIcon from "@mui/icons-material/Image";
import { AppContext } from "../Context/AppProvider";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ListAddUserInRoom({ users }) {

  const {  setRoomSelect,setIsAddUserRoomVisible ,roomselect } =
  React.useContext(AppContext);
 
  const handleUser = async(user) => {
    console.log('User clicked:', user);
    const roomRef = doc(db, "rooms", roomselect.id);
    const updatedMembers = [...(roomselect.members || []), user.uid];
  
    await updateDoc(roomRef, {
      members: updatedMembers,
    });
  
    // Update roomselect to trigger useEffect
    setRoomSelect(prev => ({
      ...prev,
      members: updatedMembers
    }));
  
    setIsAddUserRoomVisible(false);
  };

  return (
    <div className="bg-black z-40 bg-opacity-50 fixed inset-0 flex justify-center items-center">
      <div>
        
        <List sx={{ width: "600px", maxWidth: 360, bgcolor: "background.paper" }}>
          <div className="px-4 flex justify-between"> <div className="font-bold"> Thêm người vào phòng</div> <button onClick={()=>setIsAddUserRoomVisible(false)}>bỏ</button> </div>
        
          {users.map((user) => (
            <ListItemButton key={user.uid} onClick={() => handleUser(user)}>
              <ListItemAvatar>
                <Avatar src={user.photoURL || ""}>
                  {/* Fallback icon if no avatar URL */}
                  {!user.photoURL && <ImageIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.displayName || "No Name"} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </div>
  );
}
