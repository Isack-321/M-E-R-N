
import Topbar from "./components/topbar/Topbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from './pages/homepage/Homepage';
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
const App = ()=> {
  const currentUser=true;
  return (
  <Router>
    <Topbar/>
      <Routes>
        <Route exact path="/" element={<Homepage />}> </Route>
        <Route path="/posts" element={<Homepage />}> </Route>
        <Route path="/register" element= {currentUser ? <Homepage /> : <Register />}>
        </Route>
        <Route path="/login" element= {currentUser ? <Homepage /> : <Login />}></Route>
        <Route path="/post/:id" element={<Single />}></Route>
        <Route path="/write"element={currentUser ? <Write /> : <Login />}></Route>
        <Route path="/settings"element= {currentUser ? <Settings /> : <Login />}>
        </Route>
      </Routes>
        
  </Router>
  );
}

export default App;
