import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/Login";
import AddData from "./pages/AddData";
import UpdateData from "./pages/UpdateData";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/add-data" element={<AddData />}></Route>
        <Route path="/update-data/:id" element={<UpdateData />}></Route>
      </Routes>
    </>
  );
}

export default App;
