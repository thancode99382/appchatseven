import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";
import ListAddUserInRoom from "../../../../Modal/ListAddUserInRoom";

import { Avatar, Tooltip } from "antd";

export default function HeaderContent() {
  const { roomselect, users, isAddUserRoomVisible, setIsAddUserRoomVisible,usersRoom  } =
    useContext(AppContext);

  return (
    <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-100">
        <img className="rounded-full" src={roomselect?.photoURL} alt="" />
      </div>
      <div className="flex flex-col ml-3">
        <div className="font-semibold text-sm">{roomselect?.name}</div>
      </div>
      <div className="ml-auto">
        <ul className="flex flex-row items-center space-x-2">
          <li>

          <Avatar.Group  maxCount={2}>
            {usersRoom?.map((member) => (
              <Tooltip key={member.uid} title={member.displayName}>
                <Avatar src={member?.photoURL} />
              </Tooltip>
            ))}
          </Avatar.Group>
            
            
          </li>
          <li>
            
          <a
              href="#"
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
            >
              <span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  stroke="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              </span>
            </a>
           
          </li>
          <li>
            <button
              onClick={() => setIsAddUserRoomVisible(true)}
              className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-400 h-10 w-10 rounded-full"
            >
              <span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  ></path>
                </svg>
              </span>
            </button>
          </li>
        </ul>
      </div>

      {isAddUserRoomVisible ? <ListAddUserInRoom users={users} /> : <div></div>}
    </div>
  );
}
