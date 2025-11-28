import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import ItemDetails from "./pages/ItemDetails";   // IMPORTANT IMPORT
import EditItem from "./pages/EditItem";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add" element={<Upload />} />
          <Route path="/item/:id" element={<ItemDetails />} />
          <Route path="/edit/:id" element={<EditItem />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
