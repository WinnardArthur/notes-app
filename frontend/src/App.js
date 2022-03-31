import Homepage from './Pages/Homepage/Homepage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Notes from './Pages/Notes/Notes';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import { useState } from 'react';
import Header from './components/Header/Header';
import CreateNote from './Pages/createNote/CreateNote';
import EditNote from './Pages/editNote/editNote';
import Profile from './Pages/Profile/Profile';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import ForgotPassword from './Pages/forgotPassword/ForgotPassword';
import Verification from './Pages/verification/Verification';

function App() {
  const [search, setSearch] = useState("");
  
  return (
    <div className="App">
      <Router>
        <Header setSearch={(s) => setSearch(s)}/>
        <Routes>
          <Route path="/" element={ <Homepage />} exact />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/verification" element={<Verification/>} />
          <Route path='/forgot-password' element={<ForgotPassword/>} />
          <Route path='/reset-password' element={<ResetPassword />}/>
          <Route path="/notes" element={<Notes />} search={search}/>
          <Route path="/createnote" element={<CreateNote />}/>
          <Route path="/notes/:id" element={<EditNote /> }/>
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;