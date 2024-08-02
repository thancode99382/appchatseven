import HeaderContent from "./components/HeaderContent/HeaderContent.jsx"
import InputMessage from "./components/InputMessage/InputMessage.jsx"
import ContentMessages from "./components/ContentMessages/ContentMessages.jsx"

import SideBar from "./components/SideBar/SideBar.jsx";
export default function Chat() {
  return (
    <div className="flex flex-row h-screen antialiased text-gray-800">
      <SideBar />
      <div className="flex flex-col h-full w-full bg-white px-4 py-6">
        <HeaderContent />
        <div className="h-full overflow-hidden py-4">
          <ContentMessages />
        </div>
        <InputMessage />
      </div>
    </div>
  );
}
