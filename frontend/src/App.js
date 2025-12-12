import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import EventList from './pages/EventList'; // Import the new page
import CreateEvent from './pages/CreateEvent'; // Import this
import MyBookings from './pages/MyBookings'; // Import this
import AdminAttendees from './pages/AdminAttendees'; // Import this
import EditEvent from './pages/EditEvent'; // Import this

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Update this line: */}
          <Route path="/events" element={<EventList />} />
           <Route path="/create-event" element={<CreateEvent />} />
           <Route path="/edit-event/:id" element={<EditEvent />} />
           <Route path="/my-events" element={<MyBookings />} />
           <Route path="/admin/attendees/:eventId" element={<AdminAttendees />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;