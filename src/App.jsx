import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat/Chat";
import Login from "./pages/Login/Login";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRoomModal from "./Modal/AddRoomModal"
function App() {
  return (
    <Router>
      <AppProvider>
        <AuthProvider>
        
          <Routes>
            <Route path="/" element={<Chat />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          
           <AddRoomModal/>
        </AuthProvider>
      </AppProvider>

     
    </Router>
  );
}

export default App;
