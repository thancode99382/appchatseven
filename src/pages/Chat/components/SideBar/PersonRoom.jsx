
export default function PersonRoom({photoURL,displayName}) {
  return (
    <div className="relative flex flex-row items-center p-4">
      <div className="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">
       
      </div>
      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-pink-300 font-bold flex-shrink-0">
        <img className="rounded-full" src={photoURL} alt="imguser" />
      </div>
      <div className="flex flex-col flex-grow ml-3">
        <div className="text-sm font-medium">{displayName}</div>
        <div className="text-xs truncate w-40">
          ...
        </div>
      </div>
      <div className="flex-shrink-0 ml-2 self-end mb-1">
        
      </div>
    </div>
  );
}
