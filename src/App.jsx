import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Lazy load components
const ShowList = lazy(() => import('./components/ShowList'));
const ShowDetails = lazy(() => import('./components/ShowDetails'));
const BookingForm = lazy(() => import('./components/BookingForm'));

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/shows/:id" element={<ShowDetails />} />
            <Route path="/shows/:id/book" element={<BookingForm />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
