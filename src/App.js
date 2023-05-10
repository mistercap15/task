import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShowList from './ShowList';
import ShowDetails from './ShowDetails';
import BookingPage from './BookingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ShowList />} />
          <Route path="/show/:id" element={<ShowDetails />} />
          <Route path="/book/:id" element={<BookingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
