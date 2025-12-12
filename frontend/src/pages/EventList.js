import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
        checkAdminRole();
    }, []);

    const checkAdminRole = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                if (payload.role === 'ADMIN' || payload.roles?.includes('ADMIN')) {
                    setIsAdmin(true);
                }
            } catch (e) {
                console.error("Error decoding token", e);
            }
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await api.get('/events');
            setEvents(response.data);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleRegister = async (eventId) => {
        try {
            const response = await api.post(`/registrations/${eventId}`);
            alert(response.data);
            fetchEvents();
        } catch (error) {
            alert("Registration failed. You might already be registered.");
        }
    };

    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await api.delete(`/events/admin/delete/${eventId}`);
                alert("Event Deleted!");
                fetchEvents();
            } catch (error) {
                alert("Failed to delete event.");
            }
        }
    };

    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <div className="row mb-4 align-items-center">
                <div className="col-md-6">
                    <h2 className="fw-bold">Upcoming Events</h2>
                </div>
                <div className="col-md-6">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Search by name, location, or category..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="row">
                {filteredEvents.length === 0 ? (
                    <div className="col-12 text-center text-muted">
                        <h4>No events found.</h4>
                    </div>
                ) : (
                    filteredEvents.map(event => (
                        <div className="col-md-4 mb-4" key={event.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="card-header bg-primary text-white">
                                    <h5 className="card-title mb-0">{event.title}</h5>
                                </div>
                                <div className="card-body">
                                    <span className="badge bg-secondary mb-2">{event.category}</span>
                                    <p className="card-text">{event.description}</p>
                                    <ul className="list-unstyled">
                                        <li>📅 <strong>Date:</strong> {new Date(event.date).toLocaleString()}</li>
                                        <li>📍 <strong>Venue:</strong> {event.venue}</li>
                                        <li>🎤 <strong>Speaker:</strong> {event.speaker}</li>
                                        <li>👥 <strong>Attendees:</strong> {event.attendeeCount}</li>
                                    </ul>
                                </div>
                                <div className="card-footer bg-white border-top-0 d-flex gap-2">
                                    <button className="btn btn-success flex-grow-1" onClick={() => handleRegister(event.id)}>
                                        Book Ticket
                                    </button>

                                    {isAdmin && (
                                        <>
                                            <button 
                                                className="btn btn-info text-white" 
                                                onClick={() => navigate(`/admin/attendees/${event.id}`)}
                                                title="View Attendees"
                                            >
                                                👥
                                            </button>
                                            <button 
                                            className="btn btn-warning text-white"
                                            onClick={() => navigate(`/edit-event/${event.id}`)}
                                            title="Edit Event"
                                        >
                                            ✏️
                                        </button>
                                            <button 
                                                className="btn btn-danger" 
                                                onClick={() => handleDelete(event.id)}
                                                title="Delete Event"
                                            >
                                                🗑️
                                            </button>
                
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default EventList;