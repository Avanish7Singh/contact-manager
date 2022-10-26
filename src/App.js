import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ContactList from './components/contact/ContactList';
import ContactView from './components/contact/ContactView';
import ContactEdit from './components/contact/ContactEdit';
import ContactAdd from './components/contact/ContactAdd';
// import SpinnerImg from "../src/spinner/spinner.png"
import Spinner from './components/img/Spinner';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Navigate to={"/contactlist"} />} />
          <Route exact path='/contactlist' element={<ContactList />} />
          <Route exact path='/contactview/:id' element={<ContactView />} />
          <Route exact path='/contactEdit/:id' element={<ContactEdit />} />
          <Route exact path='/contactadd' element={<ContactAdd />} />


        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
