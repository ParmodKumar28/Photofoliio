// Imports
import styles from "./Styles/App.module.css";
import Navbar from "./Components/Navbar";
import AlbumList from "./Components/AlbumsList";
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
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
