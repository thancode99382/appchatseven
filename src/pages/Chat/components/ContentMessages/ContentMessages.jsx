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
    <div className="h-full overflow-y-auto p-4">
      <div className="flex flex-col-reverse">
        {messages?.length > 0 ? (
          messages.map((mess) => (
            <ItemMess
              key={mess.id}
              uid={mess.uid}
              text={mess.text}
              photoURL={mess.photoURL}
              timestamp={mess.timestamp} // Ensure timestamp is passed if sorting is needed
            />
          ))
        ) : (
          <p>No messages</p>
        )}
      </div>
    </div>
  );
}
