import { useContext, useMemo } from "react";
import ItemMess from "./ItemMess";
import useFireStore from "../../../../hook/useFireStore";
import { AppContext } from "../../../../Context/AppProvider";

export default function ContentMessages() {
  const { roomselect } = useContext(AppContext);

  const condition = useMemo(() => {
    if (!roomselect?.id) return null;
    return {
      fieldName: "roomId",
      operator: "==",
      compareValue: roomselect.id,
    };
  }, [roomselect?.id]);

  // Fetch messages based on the condition
  const messages = useFireStore("messages", condition);

  console.log("Condition:", condition);
  console.log("Messages:", messages);

  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-12 gap-y-2">
        {roomselect?  messages?.map((mess) => (
          <ItemMess
            key={mess.id} // Ensure a unique key is used
            uid={mess.uid}
            text={mess.text}
            photoURL={mess.photoURL}
          />
        )):""}
      </div>
    </div>
  );
}
