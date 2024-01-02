// Imports
import Navbar from "./Components/Navbar";
import AlbumList from "./Components/AlbumsList";
import React from 'react';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  return (
    <>
    <Navbar/>
    <ToastContainer />
    <AlbumList />
    </>
  )
}

export default App;
