import PersonRoom from "./PersonRoom";
import Menu from "./Menu";
import { useContext } from "react";
import { AppContext } from "../../../../Context/AppProvider";

export default function SideBar() {
  const {  setIsAddRoomVisible ,roomUser , setRoomSelect } = useContext(AppContext);
  console.log(roomUser)
  return (
    <div className="flex flex-row w-96 flex-shrink-0 bg-gray-100 p-4">
      <Menu />
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="text-xl font-semibold">Messages</div>
            <div className="flex items-center justify-center ml-2 text-xs h-5 w-5 text-white bg-red-500 rounded-full font-medium">
              5
            </div>
          </div>
          <div className="ml-auto">
            <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
              <svg
                className="w-4 h-4 stroke-current"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-xs text-gray-400 font-semibold uppercase">
            Team
          </div>
        </div>
        <div className="mt-2">
          <div className="flex flex-col -mx-4">
            {roomUser?.map((room=> <button onClick={() => setRoomSelect(room)} key={room.id}>  <PersonRoom   displayName={room.name} photoURL={room.photoURL}/></button> ))}
            
          </div>
        </div>
        
        <div className="h-full overflow-hidden relative pt-2">
          <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
            

            <div className="absolute bottom-0 right-0 mr-2">
              <button onClick={()=>setIsAddRoomVisible(true)} className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
