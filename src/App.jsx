import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './components/ShowList';
import ShowDetails from './components/ShowDetails';
import BookingForm from './components/BookingForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<ShowList />}></Route>
        <Route path="/shows/:id" element={<ShowDetails />}></Route>
        <Route path="/shows/:id/book" element={<BookingForm />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
