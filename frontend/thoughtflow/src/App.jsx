import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import About from './pages/about.jsx'
import Chatarea from './components/chatarea.jsx'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import Chatoptions from './pages/chatoptions.jsx'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from './components/navbar.jsx'
import  Searchusers from './pages/searchusers.jsx'
import CreateGroup from './pages/createGroup.jsx'
import CreateDarkWindow from './pages/createDark.jsx'
import EnterGroup from './pages/entergroup.jsx'
import EnterDark from './pages/enterDark.jsx'
import Group from './pages/group.jsx'
import Dark from './pages/dark.jsx'
import NotFound from './pages/notfound.jsx'

function App() {

  return (
    <>
      
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chatoptions" element={<Chatoptions />} />
          <Route path="/signup" element={< Signup />} />
          <Route path="/chatarea" element={<Chatarea />} />
          <Route path="/about" element={<About />} />
          <Route path="/searchusers" element={<Searchusers/>} />
          <Route path='/creategroup' element={<CreateGroup/>}/>
          <Route path='/creategroup' element={<CreateGroup/>}/>
          <Route path='/createdark' element={<CreateDarkWindow/>}/>
          <Route path='/entergroup' element={<EnterGroup/>}/>
          <Route path='/enterdark' element={<EnterDark/>}/>
          <Route path='/group' element={<Group/>}/>
          <Route path='/dark' element={<Dark/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>
      <ToastContainer />
    </>
  )
}

export default App
